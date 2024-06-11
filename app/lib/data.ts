import pool from './db';
import { TestData } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function testGet() {
  console.log('getting test data');

  try {
    const data = await pool.query<TestData>(`SELECT * FROM Test`);

    return data.rows;
  } catch (error) {
    console.log("error getting test data")
  }
}