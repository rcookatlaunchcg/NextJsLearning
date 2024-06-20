import { fetchGames } from '@/app/lib/games/data';
import { fetchPlayers } from '@/app/lib/players/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/runs/create-form'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Run',
};

export default async function Page() {
  //this is a bad long term idea, these lists will potentially be huge, probably a better idea to swap to some sort of autocomplete
  const games = await fetchGames();
  const players = await fetchPlayers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Runs', href: '/dashboard/runs' },
          {
            label: 'Create Run',
            href: '/dashboard/runs/create',
            active: true,
          },
        ]}
      />
      <Form games={games} players={players}/>
    </main>
  );
}