import "./globals.css";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/navigation/header";
import { ReactLenis } from "@/utilities/lenis";
import { cn } from "@/utilities/ui";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link href='/favicon.ico' rel='icon' sizes='32x32' />
        <link href='/favicon.svg' rel='icon' type='image/svg+xml' />
        <link
          href='/favicon.light.svg'
          rel='icon'
          type='image/svg+xml'
          media='(prefers-color-scheme: light)'
        />
        <link
          href='/favicon.dark.svg'
          rel='icon'
          type='image/svg+xml'
          media='(prefers-color-scheme: dark)'
        />
      </Head>
      <ReactLenis root>
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            "font-sans scroll-smooth antialiased w-screen overflow-hidden bg-[url(/set-of-restaurant-doodles-vector.jpg)]"
          )}
        >
          <Header />
          {children}
          <Toaster />
        </body>
      </ReactLenis>
    </html>
  );
}

export { metadata } from "./metadata";
