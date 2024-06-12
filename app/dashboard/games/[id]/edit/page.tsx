import Form from '@/app/ui/games/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchGameById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Game',
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
            label: 'Edit Game',
            href: `/dashboard/games/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form game={game} />
    </main>
  );
}