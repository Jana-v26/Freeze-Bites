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

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreezeDance | Premium Freeze-Dried Fruits & Powders",
  description: "Discover nature's goodness preserved in every crunch. Premium freeze-dried fruit cubes and powders - 100% natural, no preservatives.",
  keywords: ["freeze dried fruits", "fruit powder", "mango", "pineapple", "jamun", "banana", "jackfruit", "moringa"],
  authors: [{ name: "FreezeDance Team" }],
  openGraph: {
    title: "FreezeDance | Premium Freeze-Dried Fruits & Powders",
    description: "Discover nature's goodness preserved in every crunch. Premium freeze-dried fruit cubes and powders - 100% natural, no preservatives.",
    url: "https://freezedance.com",
    siteName: "FreezeDance",
    images: [
      {
        url: "https://freezedance.com/og-image.jpg", // Placeholder - real image should be added later
        width: 1200,
        height: 630,
        alt: "FreezeDance Premium Freeze-Dried Fruits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreezeDance | Premium Freeze-Dried Fruits & Powders",
    description: "Discover nature's goodness preserved in every crunch. Premium freeze-dried fruit cubes and powders - 100% natural, no preservatives.",
    images: ["https://freezedance.com/og-image.jpg"],
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
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen w-full flex flex-col antialiased font-sans bg-[#0D3D24]">
        <Providers>
          <PageLoader />
          <Header />
          <main className="flex-1 w-full flex flex-col">
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
