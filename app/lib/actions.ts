'use server';

import { z } from 'zod';
import pool from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

// export async function authenticateCreds(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     console.log("ERROR ERROR ERROR");
//     console.log(error);
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }

// export async function authenticateOAuth(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     const action = formData.get('action') as string;
//     await signIn(action);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }

// export async function logout() {
//   await signOut({ redirectTo: "/" });
// }