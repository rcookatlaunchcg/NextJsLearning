import { testGet } from '@/app/lib/data';

export default async function Page() {
  const testData = await testGet();
  console.log(testData);

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}