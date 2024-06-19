'use server';

import { z } from 'zod';
import pool from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  userName: z
    .string({ required_error: 'Please enter a user name.' })
    .min(1, { message: 'Please enter a user name.' }),
  email: z.coerce
    .string({ required_error: 'Please enter an email address.' })
    .min(1, { message: "Please enter an email address." })
    .email("Please enter a valid email."),
  createdDate: z.string(),
  modifiedDate: z.string(),
});

const CreatePlayer = FormSchema.omit({ id: true, createdDate: true, modifiedDate: true });
const UpdatePlayer = FormSchema.omit({ id: true, createdDate: true, modifiedDate: true });

export type State = {
  errors?: {
    userName?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createPlayer(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePlayer.safeParse({
    userName: formData.get('userName'),
    email: formData.get('email'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Player.',
    };
  }

  // Prepare data for insertion into the database
  const { userName, email } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await pool.query(`
      INSERT INTO players (user_name, email, created_date, modified_date)
      VALUES ($1, $2, $3, $4)
    `, [userName, email, date, date]);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { message: 'Database Error: Failed to Create Player.' };
  }

  // Revalidate the cache for the players page and redirect the user.
  revalidatePath('/dashboard/players');
  redirect('/dashboard/players');
}

export async function updatePlayer(id: string, prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = UpdatePlayer.safeParse({
      userName: formData.get('userName'),
      email: formData.get('email'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Player.',
      };
    }
     
    // Prepare data for insertion into the database
    const { userName, email } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {
      await pool.query(`
        UPDATE players
        SET user_name = $1, email = $2, modified_date = $3
        WHERE id = $4
      `, [userName, email, date, id]);
    } catch (error) {
      console.log(error);
      return { message: 'Database Error: Failed to Update Player.' };
    }
     
    revalidatePath('/dashboard/players');
    redirect('/dashboard/players');
  }

export async function deletePlayer(id: string) {
  try {
    await pool.query(`DELETE FROM players WHERE id = $1`, [id]);
    revalidatePath('/dashboard/players');

    return { message: 'Deleted Player.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Player.' };
  }
}