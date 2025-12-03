'use client'

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/dashboard/NavBar'
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Dashboard ",
//   description: "Assesment task from autobiz",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // queryClinet is used for tanstack setup.in this i have used usestate to store the data at once while mounting  to avoid re render data on evey reload  
  const [queryClient] = useState(() => new QueryClient)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <div >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>

        </div>

      </body>
    </html>
  );
}
