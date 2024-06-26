import { fetchGameById } from '@/app/lib/games/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Table from '@/app/ui/games/leaderboard-table';
import { LeaderboardTableSkeleton } from '@/app/ui/games/skeletons';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'View Game',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const game = await fetchGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: `${game.name}`,
            href: `/dashboard/games/${id}/view`,
            active: true,
          },
        ]}
      />
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Leaderboard
      </h1>
      <Suspense fallback={<LeaderboardTableSkeleton />}>
        <Table gameId={id} />
      </Suspense>
    </main>
  );
}