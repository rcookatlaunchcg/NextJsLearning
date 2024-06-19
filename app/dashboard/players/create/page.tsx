import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/players/create-form'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Game',
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Players', href: '/dashboard/players' },
          {
            label: 'Create Player',
            href: '/dashboard/players/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}