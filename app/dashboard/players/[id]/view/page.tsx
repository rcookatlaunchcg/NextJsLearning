import { fetchPlayerById } from '@/app/lib/players/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Table from '@/app/ui/players/all-runs-table';
import { AllRunsTableSkeleton } from '@/app/ui/players/skeletons';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'View Player',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const player = await fetchPlayerById(id);

  if (!player) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Players', href: '/dashboard/players' },
          {
            label: `${player.user_name}`,
            href: `/dashboard/players/${id}/view`,
            active: true,
          },
        ]}
      />
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        All Runs
      </h1>
      <Suspense fallback={<AllRunsTableSkeleton />}>
        <Table playerId={id} />
      </Suspense>
    </main>
  );
}