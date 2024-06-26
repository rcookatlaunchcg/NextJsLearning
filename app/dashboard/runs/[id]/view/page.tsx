import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Run',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Runs', href: '/dashboard/runs' },
          {
            label: `${id}`,
            href: `/dashboard/runs/${id}/view`,
            active: true,
          },
        ]}
      />
    </main>
  );
}