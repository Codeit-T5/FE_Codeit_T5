import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';

import HomeGnb from '@/components/home/HomeGnb';
import ReactQueryProvider from '@/libs/home/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '45 920',
  style: 'normal',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ko">
      <body className={`bg-gray-200 font-pretendard antialiased ${pretendard.variable}`}>
        <ReactQueryProvider>
          <div className='layout'>
              {children}
          </div>
          <HomeGnb />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
