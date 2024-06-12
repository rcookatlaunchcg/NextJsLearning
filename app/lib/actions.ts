'use server';

import { z } from 'zod';
import pool from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    name: z
      .string({ required_error: 'Please enter a name.' })
      .min(1, { message: 'Please enter a name.' }),
    releaseYear: z.coerce
      .number()
      .gt(1900, { message: 'Please enter a release year after 1900.' }),
    platform: z
      .string({ required_error: 'Please enter a platform.' })
      .min(1, { message: 'Please enter a name.' }),
});

const CreateGame = FormSchema.omit({ id: true });
const UpdateGame = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    releaseYear?: string[];
    platform?: string[];
  };
  message?: string | null;
};

export async function createGame(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateGame.safeParse({
    name: formData.get('gameName'),
    releaseYear: formData.get('releaseYear'),
    platform: formData.get('platform'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Game.',
    };
  }

  // Prepare data for insertion into the database
  const { name, releaseYear, platform } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await pool.query(`
      INSERT INTO games (name, release_year, platform)
      VALUES ($1, $2, $3)
    `, [name, releaseYear, platform]);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { message: 'Database Error: Failed to Create Game.' };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/games');
  redirect('/dashboard/games');
}

export async function updateGame(id: string, prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = UpdateGame.safeParse({
      name: formData.get('gameName'),
      releaseYear: formData.get('releaseYear'),
      platform: formData.get('platform'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Game.',
      };
    }
     
    // Prepare data for insertion into the database
    const { name, releaseYear, platform } = validatedFields.data;

    try {
      await pool.query(`
        UPDATE games
        SET name = $1, release_year = $2, platform = $3
        WHERE id = $4
      `, [name, releaseYear, platform, id]);
    } catch (error) {
      return { message: 'Database Error: Failed to Update Game.' };
    }
     
    revalidatePath('/dashboard/games');
    redirect('/dashboard/games');
  }

export async function deleteGame(id: string) {
  try {
    await pool.query(`DELETE FROM games WHERE id = $1`, [id]);
    revalidatePath('/dashboard/games');

    return { message: 'Deleted Game.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Game.' };
  }
}