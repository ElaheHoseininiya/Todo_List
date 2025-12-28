import './globals.css';
import Header from './components/layout/header';
import React from 'react';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata = {
  title: 'مدیریت وظایف من',
  description: 'داشبورد ساده برای مدیریت و اولویت‌بندی وظایف روزانه',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${rubik.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;