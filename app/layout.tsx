import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify';

import Header from "@/components/Header";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className}`} style={{ backgroundColor: '#f1f2f8' }}>
          <Header />
          <main className="flex-1 flex-col justify-center w-1/2 my-7 mx-auto">
            {children}
          </main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
// ohDMPdS5sUf4