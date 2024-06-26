import pool from '@/app/lib/db';
import { PlayerTable, PlayerForm, PlayerField, AllRunsTable } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPlayers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const players = await pool.query<PlayerTable>(`
      SELECT
        id,
        user_name,
        email,
        created_date
      FROM players
      WHERE
        user_name ILIKE '%' || $1 || '%' OR
        email ILIKE '%' || $1 || '%' OR
        created_date::text ILIKE '%' || $1 || '%'
      ORDER BY user_name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `, [query]);

    return players.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch players.');
  }
}

export async function fetchPlayersPages(query: string) {
  noStore();
  try {
    const count = await pool.query(`
      SELECT COUNT(*)
      FROM players
      WHERE
        user_name ILIKE '%' || $1 || '%' OR
        email ILIKE '%' || $1 || '%' OR
        created_date::text ILIKE '%' || $1 || '%'
    `, [query]);
  
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of players.');
  }
}

export async function fetchPlayerById(id: string) {
  noStore();
  try {
    const data = await pool.query<PlayerForm>(`
      SELECT
        id,
        user_name,
        email,
        created_date
      FROM players
      WHERE id = $1
    `, [id]);

    const player = data.rows.map((player: PlayerForm) => ({
      ...player
    }));

    return player[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player.');
  }
}

export async function fetchPlayers() {
  noStore();
  try {
    const data = await pool.query<PlayerField>(`
      SELECT
        id,
        user_name
      FROM players
      ORDER BY user_name ASC
    `);

    const games = data.rows;
    return games;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all games.');
  }
}

export async function fetchAllRuns(playerId: string) {
  noStore();

  try {
    const data = await pool.query<AllRunsTable>(`
      SELECT
        r.id,
        r.game_id,
        r.duration,
        r.video_link,
        r.run_date,
        g.name AS game_name,
        g.platform
      FROM runs r
        INNER JOIN games g ON r.game_id = g.id
      WHERE r.player_id = $1
      ORDER BY run_date DESC
    `, [playerId]);

    const runs = data.rows;
    return runs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all run data.');
  }
}