import Link from 'next/link';
import { Mail, Facebook, Instagram } from 'lucide-react';

const shopLinks = [
  { name: 'New Arrivals', href: '/shop?tag=new' },
  { name: 'Freeze-Dried Fruit Cubes', href: '/shop?category=cubes' },
  { name: 'Superfood Powders', href: '/shop?category=powders' },
  { name: 'Tropical Blends', href: '/shop?category=blends' },
  { name: 'Gift Hampers', href: '/shop?category=gifts' },
  { name: 'FreezeDelights Merch', href: '/shop?category=merch' },
];

const learnLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Process', href: '/about#process' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Press', href: '/press' },
];

const communityLinks = [
  { name: 'Affiliate Program', href: '/affiliates' },
  { name: 'Rewards Program', href: '/rewards' },
  { name: 'Work With Us', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Accessibility Statement', href: '/accessibility' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F5E3E] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-2 md:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-10">

        {/* Logo — spans full width on mobile */}
        <div className="col-span-2 md:col-span-1 flex items-start">
          <Link href="/">
            <span className="font-display font-extrabold text-4xl tracking-tight leading-none">
              <span className="text-[#C8D94C]">Freeze</span>
              <br />
              <span className="text-white">Delights</span>
            </span>
          </Link>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-[#C8D94C] font-bold text-sm tracking-widest uppercase mb-5">
            Shop
          </h4>
          <ul className="space-y-3">
            {shopLinks.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LEARN */}
        <div>
          <h4 className="text-[#C8D94C] font-bold text-sm tracking-widest uppercase mb-5">
            Learn
          </h4>
          <ul className="space-y-3">
            {learnLinks.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COMMUNITY */}
        <div>
          <h4 className="text-[#C8D94C] font-bold text-sm tracking-widest uppercase mb-5">
            Community
          </h4>
          <ul className="space-y-3">
            {communityLinks.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h4 className="text-[#C8D94C] font-bold text-sm tracking-widest uppercase mb-5">
            Follow Us
          </h4>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@freezedelights.in"
              aria-label="Email"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* TikTok icon via SVG */}
            <a
              href="#"
              aria-label="TikTok"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p>Copyright &copy; 2026 <Link href="/" className="underline underline-offset-2 hover:text-white transition-colors">FreezeDelights</Link>. All rights reserved.</p>
          <p>Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
