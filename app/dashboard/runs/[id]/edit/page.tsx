import Form from '@/app/ui/runs/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchRunById } from '@/app/lib/runs/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGames } from '@/app/lib/games/data';
import { fetchPlayers } from '@/app/lib/players/data';

export const metadata: Metadata = {
  title: 'Edit Run',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [run, players, games] = await Promise.all([
    fetchRunById(id),
    //this is a bad long term idea, these lists will potentially be huge, probably a better idea to swap to some sort of autocomplete
    fetchPlayers(),
    fetchGames(),
  ]);

  if (!run) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Runs', href: '/dashboard/runs' },
          {
            label: 'Edit Run',
            href: `/dashboard/runs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form run={run} games={games} players={players} />
    </main>
  );
}