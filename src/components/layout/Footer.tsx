'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const navigationLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Process', href: '/about#process' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const tradeLinks = [
  { name: 'Wholesale Orders', href: '/wholesale' },
  { name: 'Bulk Pricing', href: '/bulk-pricing' },
  { name: 'Shipping Info', href: '/shipping' },
  { name: 'Returns & Refunds', href: '/returns' },
  { name: 'Partner With Us', href: '/partnerships' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-[#0d1c16] text-white pt-16 pb-12 px-8 relative overflow-hidden border-t border-[var(--color-outline-variant)]/50">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#705d00]/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col items-start lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-extrabold tracking-tighter font-headline text-white drop-shadow-sm">
                FreezeDance
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Pioneers in cold-sublimation technology. We deliver premium freeze-dried fruits and superfood powders globally, preserving 97% of nature's original nutrients.
            </p>
            
            <div className="flex flex-col gap-3 mb-8 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <span className="text-[#705d00] font-bold mt-0.5">📍</span>
                <p className="leading-tight">123 Tropical Orchard Way,<br/>Konkan Coast, MH 415612, India</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#705d00] font-bold">✉️</span>
                <a href="mailto:hello@freezedance.com" className="hover:text-white transition-colors">hello@freezedance.com</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#705d00] font-bold">📞</span>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[#705d00] font-bold">🛡️</span>
                <span className="opacity-80 font-mono text-xs">FSSAI: 11521000000000</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 luxe-glass rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[#705d00] uppercase tracking-widest text-xs font-bold mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trade Services */}
          <div>
            <h4 className="text-[#705d00] uppercase tracking-widest text-xs font-bold mb-6">
              Trade Services
            </h4>
            <ul className="space-y-4">
              {tradeLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Market Insights */}
          <div>
            <h4 className="text-[#705d00] uppercase tracking-widest text-xs font-bold mb-6">
              Market Insights
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Stay updated with the latest trends, new product launches, and
              exclusive offers from FreezeDance.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#705d00]/50 transition-colors"
              />
              <button
                type="submit"
                className="ml-2 w-10 h-10 rounded-full bg-[#705d00] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg shadow-[#705d00]/20"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; 2026 FreezeDance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Trade Terms
            </Link>
            <Link
              href="/quality"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Quality Assurance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
