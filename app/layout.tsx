import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { TopProgressBar } from '@/components/TopProgressBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'NexStore — Official First-Party App Ecosystem',
  description: 'Enterprise-grade, premium application marketplace.',
  icons: {
    icon: 'https://i.ibb.co/LDsrNcxr/20260825-191156.png',
    apple: 'https://i.ibb.co/LDsrNcxr/20260825-191156.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NexStore',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-cosmic-obsidian text-text-primary selection:bg-electric-blue selection:text-white" suppressHydrationWarning>
        <TopProgressBar />
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
