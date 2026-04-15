'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const shopLinks = [
  { name: 'All Products', href: '/shop' },
  { name: 'Freeze-Dried Fruit Cubes', href: '/shop?category=cubes' },
  { name: 'Superfood Powders', href: '/shop?category=powders' },
  { name: 'Tropical Blends', href: '/shop?category=blends' },
  { name: 'Gift Hampers', href: '/shop?category=gifts' },
];

const learnLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Process', href: '/about#process' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropOpen, setShopDropOpen] = useState(false);
  const [learnDropOpen, setLearnDropOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { cart, toggleCart } = useCartStore();
  const totalItems = cart?.totalItems || 0;

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="bg-[#0F5E3E] text-white text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide">
        INDIA&apos;S #1 FREEZE-DRIED FRUIT BRAND &nbsp;·&nbsp; 100% NATURAL &nbsp;·&nbsp; FREE SHIPPING OVER ₹499
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-50 bg-[#0F5E3E] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-display font-extrabold text-2xl tracking-tight leading-none">
              <span className="text-[#C8D94C]">Freeze</span>
              <span className="text-white">Delights</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors py-1"
            >
              Home
            </Link>

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropOpen(true)}
              onMouseLeave={() => setShopDropOpen(false)}
            >
              <Link href="/shop" className="flex items-center gap-1 text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors py-1">
                Shop <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              {shopDropOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl py-2 z-50">
                  {shopLinks.map((l) => (
                    <Link
                      key={l.name}
                      href={l.href}
                      className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F0F7ED] hover:text-[#0F5E3E] font-medium transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/shop?tag=new"
              className="text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors py-1"
            >
              New Arrivals
            </Link>

            {/* Learn dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLearnDropOpen(true)}
              onMouseLeave={() => setLearnDropOpen(false)}
            >
              <Link href="/about" className="flex items-center gap-1 text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors py-1">
                Learn <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              {learnDropOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl py-2 z-50">
                  {learnLinks.map((l) => (
                    <Link
                      key={l.name}
                      href={l.href}
                      className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F0F7ED] hover:text-[#0F5E3E] font-medium transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/shop?category=cubes"
              className="text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors"
            >
              Our Fruits
            </Link>

            <Link
              href="/rewards"
              className="text-white font-semibold text-sm hover:text-[#C8D94C] transition-colors"
            >
              Rewards
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User */}
            <Link
              href={isAuthenticated ? '/account' : '/login'}
              className="text-white hover:text-[#C8D94C] transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" strokeWidth={2} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-[#C8D94C] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4.5 h-4.5 bg-[#C8D94C] text-[#0F5E3E] text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#C8D94C] transition-colors ml-1"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F5E3E] border-t border-white/10 px-6 pb-6">
            <nav className="flex flex-col gap-1 pt-4">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white font-semibold border-b border-white/10 hover:text-[#C8D94C] transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/shop?tag=new"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white font-semibold border-b border-white/10 hover:text-[#C8D94C] transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white font-semibold border-b border-white/10 hover:text-[#C8D94C] transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/shop?category=cubes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white font-semibold border-b border-white/10 hover:text-[#C8D94C] transition-colors"
              >
                Our Fruits
              </Link>
              <Link
                href="/rewards"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white font-semibold hover:text-[#C8D94C] transition-colors"
              >
                Rewards
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-[#C8D94C] text-[#0F5E3E] font-extrabold text-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
