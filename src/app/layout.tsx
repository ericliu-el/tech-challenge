import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import ChakraProviders from '@/app/components/ChakraProviders'
import { ApolloWrapper } from "@/app/components/ApolloWrapper";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Leonardo - Tech Challenge - Peng Liu",
  description: "By Peng Liu @ Auckland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>
          <ChakraProviders>
            <Suspense>
              {children}
            </Suspense>
          </ChakraProviders>
        </ApolloWrapper>
      </body>
    </html>
  );
}
