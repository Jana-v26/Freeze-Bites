'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Freeze-Dried Cubes', href: '/shop?category=cubes' },
    { name: 'Fruit Powders', href: '/shop?category=powder' },
    { name: 'Combo Packs', href: '/shop?category=combos' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Process', href: '/about#process' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F3F4F6]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <span className="text-xl font-bold text-[#171717] tracking-tight">
                FreezeDance
              </span>
            </Link>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-6 max-w-xs">
              Premium freeze-dried fruits and powders, preserving nature&apos;s goodness
              in every crunch. 100% natural, no preservatives.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#171717] mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Row */}
        <div className="mt-14 pt-8 border-t border-[#F3F4F6] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="mailto:hello@freezedance.in"
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            hello@freezedance.in
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            +91 98765 43210
          </a>
          <span className="flex items-center gap-2 text-sm text-[#6B7280]">
            <MapPin className="w-4 h-4" />
            India
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            &copy; 2026 FreezeDance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#6B7280] hover:text-[#171717] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
