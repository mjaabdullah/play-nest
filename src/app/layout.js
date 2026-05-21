import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Toast } from "@heroui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PlayNest – Easy Sports Facility Booking",
  description:
    "Book football turfs, badminton courts, swimming lanes, and more with PlayNest. Discover nearby sports facilities and reserve your favorite venue online in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-[#0A0F1E]">
        <Toast.Provider />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
