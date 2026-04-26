import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"], 
  weight: ["200", "300", "400", "500", "700", "800", "900"], 
  variable: "--font-tajawal", 
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
      className= "h-full antialiased"
    >
      <body className={`${tajawal.variable} font-sans min-h-full flex flex-col`}>
      <QueryProvider>
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
