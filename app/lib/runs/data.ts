import pool from '@/app/lib/db';
import { RunTable, RunForm } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRuns(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const runs = await pool.query<RunTable>(`
      SELECT
        r.id,
        r.player_id,
        r.game_id,
        r.duration,
        r.video_link,
        r.run_date,
        g.name AS game_name,
        p.user_name AS player_name
      FROM runs r
        INNER JOIN players p ON r.player_id = p.id
        INNER JOIN games g ON r.game_id = g.id
      WHERE
        r.duration ILIKE '%' || $1 || '%' OR
        r.video_link ILIKE '%' || $1 || '%' OR
        r.run_date::text ILIKE '%' || $1 || '%' OR
        g.name ILIKE '%' || $1 || '%' OR
        p.user_name ILIKE '%' || $1 || '%'
      ORDER BY run_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `, [query]);

    return runs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch runs.');
  }
}

export async function fetchRunsPages(query: string) {
  noStore();
  try {
    const count = await pool.query(`
      SELECT COUNT(*)
      FROM runs r
        INNER JOIN players p ON r.player_id = p.id
        INNER JOIN games g ON r.game_id = g.id
      WHERE
        r.duration ILIKE '%' || $1 || '%' OR
        r.video_link ILIKE '%' || $1 || '%' OR
        r.run_date::text ILIKE '%' || $1 || '%' OR
        g.name ILIKE '%' || $1 || '%' OR
        p.user_name ILIKE '%' || $1 || '%'
    `, [query]);
  
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of runs.');
  }
}

export async function fetchRunById(id: string) {
  noStore();
  try {
    const data = await pool.query<RunForm>(`
      SELECT
        id,
        player_id,
        game_id,
        duration,
        video_link,
        run_date::text
      FROM runs
      WHERE id = $1
    `, [id]);

    const player = data.rows.map((player: RunForm) => ({
      ...player
    }));

    return player[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch run.');
  }
}