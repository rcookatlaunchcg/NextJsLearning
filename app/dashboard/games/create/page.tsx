import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/games/create-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Game',
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: 'Create Game',
            href: '/dashboard/games/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}