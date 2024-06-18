import { Metadata } from 'next';
//import {auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  //const session = await auth();

  //redirect to the sign in page
  //if (!session?.isRegistered) {
  //  redirect("/register");
  //}

  return (
    <main>
      {/* <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
        <div className="flex flex-col rounded-md bg-neutral-100">
          <div className="p-4 font-bold rounded-t-md bg-neutral-200">
            Current Session
          </div>
          <pre className="py-6 px-4 whitespace-pre-wrap break-all">
            {JSON.stringify(
              { ...session },
              null,
              2
            )}
          </pre>
        </div>
      </div> */}
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}