'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { cart, toggleCart } = useCartStore();

  const totalItems = cart?.totalItems || 0;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 transition-all duration-300 pointer-events-none pt-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center nav-pill px-6 py-3 pointer-events-auto">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex items-center justify-center shadow-inner">
                <span className="text-[#0d211b] font-extrabold font-display text-lg leading-none mt-0.5 ml-0.5">F</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight font-display text-[var(--color-foreground)] drop-shadow-sm">
              FreezeDance
            </span>
          </Link>

          {/* Desktop Nav — Center */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-display font-semibold text-sm transition-colors tracking-wide ${
                  pathname === link.href
                    ? 'text-[var(--color-primary)] drop-shadow-sm'
                    : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-foreground)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions — Right */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              className="hidden md:flex items-center justify-center hover:opacity-100 opacity-70 transition-transform hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] text-[var(--color-foreground)]" strokeWidth={2.5} />
            </button>

            {/* User */}
            <Link
              href={isAuthenticated ? '/account' : '/login'}
              className="hidden md:flex items-center justify-center hover:opacity-100 opacity-70 transition-transform hover:scale-110 active:scale-95"
            >
              <User className="w-[18px] h-[18px] text-[var(--color-foreground)]" strokeWidth={2.5} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative hover:opacity-100 opacity-70 transition-transform hover:scale-110 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-[var(--color-foreground)]" strokeWidth={2.5} />
              {totalItems > 0 && (
               <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[var(--color-primary)] text-[#0d211b] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Contact link */}
            <Link
              href="/contact"
              className="hidden md:block text-sm font-bold text-[var(--color-on-surface-variant)] hover:text-[var(--color-foreground)] transition-colors ml-2"
            >
              Contact
            </Link>

            {/* Order Now button */}
            <Link
              href="/shop"
              className="hidden md:inline-flex bg-[var(--color-secondary)] text-[#0d211b] px-7 py-2.5 rounded-full font-extrabold text-sm shadow-[0_4px_14px_rgba(232,189,58,0.3)] hover:scale-105 hover:bg-[#fccc4c] transition-all tracking-wide ml-2 border border-[#fccc4c]/50"
            >
              Order Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:opacity-100 opacity-80 transition-transform active:scale-95 ml-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--color-foreground)]" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6 text-[var(--color-foreground)]" strokeWidth={2.5} />
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-3xl pt-28 px-8 md:hidden border-b border-[var(--color-outline-variant)]"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-5 text-2xl font-extrabold font-display border-b border-[var(--color-outline-variant)] ${
                      pathname === link.href
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-foreground)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full border border-[var(--color-outline-variant)] font-bold text-sm text-[var(--color-foreground)] hover:bg-white/5 transition-colors"
              >
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-[var(--color-secondary)] text-[#0d211b] font-extrabold tracking-wide text-sm shadow-[0_4px_14px_rgba(232,189,58,0.3)]"
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
