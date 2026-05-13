import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";
import { CONFIG } from "@/data/config/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "TORONTO taxi &  service Split | Airport taxi Split | Taxi Split",
  description:
    "Taxi service in Split, Split airport and surroundings. Book your taxi ride with us and experience reliable and comfortable transportation throughout the city. Our professional drivers are ready to take you wherever you need to go, whether it's for business or leisure. Enjoy a hassle-free taxi experience with our easy booking system and competitive rates.",

  verification: {
    yandex: "dff10350c71124f9",
  },
  robots: {
    index: true,
    follow: true,
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
