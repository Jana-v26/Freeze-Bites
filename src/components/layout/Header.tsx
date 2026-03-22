'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { cart, toggleCart } = useCartStore();

  const totalItems = cart?.totalItems || 0;

  return (
    <>
      {/* Glass blur fixed nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f8]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tighter text-[#1c1b1b]">
              FreezeDance
            </span>
          </Link>

          {/* Desktop Nav — Center */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-['Plus_Jakarta_Sans'] text-sm font-medium text-[#1c1b1b] opacity-80 hover:opacity-100 hover:text-[#705d00] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions — Right */}
          <div className="flex items-center gap-5">
            <button
              className="hidden md:block hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] text-[#1c1b1b]" strokeWidth={1.5} />
            </button>

            <Link
              href={isAuthenticated ? '/account' : '/login'}
              className="hidden md:block hover:opacity-60 transition-opacity"
            >
              <User className="w-[18px] h-[18px] text-[#1c1b1b]" strokeWidth={1.5} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-[#1c1b1b]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#705d00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Golden gradient Order Now button */}
            <Link
              href="/shop"
              className="hidden md:inline-flex bg-gradient-to-br from-[#705d00] to-[#ffd700] text-white px-6 py-2.5 rounded-full font-semibold text-sm font-['Plus_Jakarta_Sans'] hover:shadow-lg hover:shadow-[#ffd700]/25 transition-shadow"
            >
              Order Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:opacity-60 transition-opacity"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#1c1b1b]" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5 text-[#1c1b1b]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#fcf9f8] pt-28 px-8 md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 font-['Plus_Jakarta_Sans'] text-base font-medium text-[#1c1b1b] border-b border-[#1c1b1b]/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-center font-['Plus_Jakarta_Sans'] text-sm font-medium text-[#1c1b1b] border border-[#1c1b1b]/20 rounded-full"
              >
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 bg-gradient-to-br from-[#705d00] to-[#ffd700] text-white rounded-full text-center text-sm font-semibold font-['Plus_Jakarta_Sans']"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
