import Form from '@/app/ui/players/edit-form'
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPlayerById } from '@/app/lib/players/data'
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Game',
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
            label: 'Edit Player',
            href: `/dashboard/players/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form player={player} />
    </main>
  );
}