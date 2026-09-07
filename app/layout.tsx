import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Buddy Up! — Messages Is Now Live',
  description: 'Make a game. Pick a buddy. Play together and unlock rewards.',
  metadataBase: new URL('https://buddy-up-messages-live.good-cabin-8588.chatgpt.site'),
  openGraph: {
    title: 'Buddy Up! — Messages Is Now Live',
    description: 'Make a game. Pick a buddy. Play together and unlock rewards.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Buddy Up candy-style event artwork' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buddy Up! — Messages Is Now Live',
    description: 'Make a game. Pick a buddy. Play together and unlock rewards.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
