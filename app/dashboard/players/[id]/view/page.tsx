import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Player',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Players', href: '/dashboard/players' },
          {
            label: `${id}`,
            href: `/dashboard/players/${id}/view`,
            active: true,
          },
        ]}
      />
    </main>
  );
}