'use server';

import { z } from 'zod';
import pool from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  playerId: z.string({
    invalid_type_error: 'Please select a player.',
  }),
  gameId: z.string({
    invalid_type_error: 'Please select a game.',
  }),
  //todo: use a zod regex for this check instead of .time()
  duration: z
    .string({ required_error: 'Please enter a time.' })
    .time({ message: 'Please enter a valid time.' }),
  link: z.string({ invalid_type_error: 'Please enter a string.' }),
  runDate: z
    .string({ required_error: 'Please enter a run date.' })
    .date('Please enter a valid date (YYYY-MM-DD)'),
});

const CreateRun = FormSchema.omit({ id: true });
const UpdateRun = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    playerId?: string[];
    gameId?: string[];
    duration?: string[];
    link?: string[];
    runDate?: string[];
  };
  message?: string | null;
};

export async function createRun(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateRun.safeParse({
    playerId: formData.get('playerId'),
    gameId: formData.get('gameId'),
    duration: formData.get('duration'),
    link: formData.get('link'),
    runDate: formData.get('runDate'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Run.',
    };
  }

  // Prepare data for insertion into the database
  const { playerId, gameId, duration, link, runDate } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await pool.query(`
      INSERT INTO runs (player_id, game_id, duration, video_link, run_date, created_date, modified_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [playerId, gameId, duration, link, runDate, date, date]);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Run.',
    };
  }
 
  // Revalidate the cache for the runs page and redirect the user.
  revalidatePath('/dashboard/runs');
  redirect('/dashboard/runs');
}

export async function updateRun(id: string, prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateRun.safeParse({
    playerId: formData.get('playerId'),
    gameId: formData.get('gameId'),
    duration: formData.get('duration'),
    link: formData.get('link'),
    runDate: formData.get('runDate'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Run.',
    };
  }
    
  // Prepare data for insertion into the database
  const { playerId, gameId, duration, link, runDate } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await pool.query(`
      UPDATE runs
      SET player_id = $1, game_id = $2, duration = $3, video_link = $4, run_date = $5, modified_date = $6
      WHERE id = $7
    `, [playerId, gameId, duration, link, runDate, date, id]);
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Run.' };
  }
    
  revalidatePath('/dashboard/runs');
  redirect('/dashboard/runs');
}

export async function deleteRun(id: string) {
  try {
    await pool.query(`DELETE FROM runs WHERE id = $1`, [id]);
    revalidatePath('/dashboard/runs');

    return { message: 'Deleted Run.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Run.' };
  }
}