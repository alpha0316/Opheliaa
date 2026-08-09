import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import MessagesClient from '@/components/messages-client';

export const metadata: Metadata = { title: 'Messages | Ophelia' };
export const dynamic = 'force-dynamic';

export default function MessagesPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  return (
    <div className='pt-[72px]'>
      <Suspense
        fallback={
          <div className='h-[calc(100dvh-72px)] flex items-center justify-center text-lux-muted'>
            <Loader2 size={20} className='animate-spin' />
          </div>
        }
      >
        <MessagesClient />
      </Suspense>
    </div>
  );
}
