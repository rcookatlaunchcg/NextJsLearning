import pool from '@/app/lib/db';
import { GameTable, GameForm } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredGames(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await pool.query<GameTable>(`
      SELECT
        id,
        name,
        release_year,
        platform
      FROM games
      WHERE
        name ILIKE '%' || $1 || '%' OR
        release_year::text ILIKE '%' || $1 || '%' OR
        platform ILIKE '%' || $1 || '%'
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `, [query]);

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch games.');
  }
}

export async function fetchGamesPages(query: string) {
  noStore();
  try {
    const count = await pool.query(`
      SELECT COUNT(*)
      FROM games
      WHERE
        name ILIKE '%' || $1 || '%' OR
        release_year::text ILIKE '%' || $1 || '%' OR
        platform ILIKE '%' || $1 || '%'
    `, [query]);
  
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of games.');
  }
}

export async function fetchGameById(id: string) {
    noStore();
    try {
      const data = await pool.query<GameForm>(`
        SELECT
          id,
          name,
          release_year,
          platform
        FROM games
        WHERE id = $1
      `, [id]);
  
      const game = data.rows.map((game: GameForm) => ({
        ...game
      }));
  
      return game[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch game.');
    }
  }