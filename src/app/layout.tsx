import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimeProvider } from "@/components/AnimeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aniruddha Adak | Portfolio",
  description: "Animated Portfolio of Aniruddha Adak - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AnimeProvider>
          {children}
        </AnimeProvider>
      </body>
    </html>
  );
}
