import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreezeDelights | Premium Freeze-Dried Fruits & Powders",
  description:
    "India's finest freeze-dried fruits and superfood powders. 100% natural, no preservatives — all the flavour, all the nutrition.",
  keywords: [
    "freeze dried fruits",
    "fruit powder",
    "mango",
    "pineapple",
    "jamun",
    "banana",
    "jackfruit",
    "moringa",
    "freeze delights",
  ],
  authors: [{ name: "FreezeDelights Team" }],
  openGraph: {
    title: "FreezeDelights | Premium Freeze-Dried Fruits & Powders",
    description:
      "India's finest freeze-dried fruits and superfood powders. 100% natural, no preservatives.",
    url: "https://freezedelights.in",
    siteName: "FreezeDelights",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreezeDelights | Premium Freeze-Dried Fruits & Powders",
    description:
      "India's finest freeze-dried fruits and superfood powders. 100% natural, no preservatives.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen w-full flex flex-col antialiased font-sans bg-white">
        <Providers>
          <Header />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
