import { Metadata } from 'next';
import {auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  //const session = await auth();

  //redirect to the sign in page
  //if (!session?.user) {
  //    redirect("/");
  //}

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}