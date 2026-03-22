import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import Providers from "@/components/providers/Providers";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatBot from "@/components/chat/ChatBot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreezeDance | Premium Freeze-Dried Fruits & Powders",
  description: "Discover nature's goodness preserved in every crunch. Premium freeze-dried fruit cubes and powders - 100% natural, no preservatives.",
  keywords: ["freeze dried fruits", "fruit powder", "mango", "pineapple", "jamun", "banana", "jackfruit", "moringa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <PageLoader />
          <Header />
          <main className="flex-1 pt-24 pb-12">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
