// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const BombGame = dynamic(() => import('@/components/bombgame/BombGame'), {
  ssr: false,
});

export default function Page() {
  return <BombGame />;
}