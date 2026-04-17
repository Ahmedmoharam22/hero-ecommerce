import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Hero",
  description: "Ecommerce Hero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <QueryProvider>
          {/* لو مش صفحة Auth، أظهر الـ Navbar */}
         <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
          
          {/* لو مش صفحة Auth، أظهر الـ Footer */}
           <Footer />
          
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
