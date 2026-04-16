'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Instagram, Facebook } from 'lucide-react';
import { productImages } from '@/lib/images';

// ─── Product category cards ───────────────────────────────────────────────
const categories = [
  {
    name: 'Antioxidant Rich\nJamun Cubes',
    href: '/shop/jamun-pouch',
    bg: '#5D348B', // Deep Purple
    image: productImages['jamun-pouch'].main,
    alt: 'Jamun Pouch',
  },
  {
    name: 'Potassium Packed\nBanana Slices',
    href: '/shop/banana-pouch',
    bg: '#FFD700', // Gold/Yellow
    image: productImages['banana-pouch'].main,
    alt: 'Banana Pouch',
  },
  {
    name: 'Pure Organic\nMoringa Powder',
    href: '/shop/moringa-pouch',
    bg: '#0F5E3E', // Forest Green
    image: productImages['moringa-pouch'].main,
    alt: 'Moringa Pouch',
  },
  {
    name: 'Vitamin-Dense\nMango Cubes',
    href: '/shop/mango-pouch',
    bg: '#FF8C00', // Vibrant Orange
    image: productImages['mango-pouch'].main,
    alt: 'Mango Pouch',
  },
];

// ─── Ingredient marquee items ──────────────────────────────────────────────
const ingredients = [
  'MANGO', 'BANANA', 'GUAVA', 'JAMUN', 'MORINGA',
];
const marqueeItems = [...ingredients, ...ingredients, ...ingredients];

// ─── Pillar cards (Organic layout) ─────────────────────────────────────────
const pillars = [
  {
    title: 'Vitamin Dense',
    desc: 'Our Mango and Guava segments are cold-sublimated at peak ripeness to preserve 98% of Vitamin C and Lycopene density.',
    image: '/images/products/mango-pouch.png',
    alt: 'Mango Pouch',
    bg: '#FF8C00', // Mango Orange
  },
  {
    title: 'Fiber Excellence',
    desc: "Meelar Banana slices provide a concentrated source of pre-biotic fiber, supporting gut health with zero added sugars.",
    image: '/images/products/banana-pouch.png',
    alt: 'Banana Pouch',
    bg: '#ffd700', // Banana Yellow
  },
  {
    title: 'Iron Power',
    desc: 'Our Moringa is exceptionally rich in Iron and contains 9 essential amino acids, making it a complete plant-based protein.',
    image: '/images/products/moringa-pouch.png',
    alt: 'Moringa Pouch',
    bg: '#0F5E3E', // Moringa Green
  },
];

// ─── Email signup block ──────────────────────────────────────────────────
function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-sm">
      <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-fd-green)] mb-4">
        Get 15% Off On Us
      </h2>
      <p className="text-[var(--color-fd-text-muted)] text-sm sm:text-base mb-8 leading-relaxed max-w-lg mx-auto">
        Share your email to get 15% off your first order. We&apos;ll also keep
        you posted about promotions, new products, and tasty new ways to enjoy superfoods.
      </p>
      {submitted ? (
        <p className="text-[var(--color-fd-green)] font-semibold text-lg">
          🎉 Thanks! Check your inbox for your discount code.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 border-2 border-[var(--color-fd-green)]/20 rounded-full px-6 py-3.5 text-sm outline-none focus:border-[var(--color-fd-green)] transition-colors"
          />
          <button
            type="submit"
            className="border-2 border-[var(--color-fd-green)] text-[var(--color-fd-green)] font-bold px-10 py-3.5 rounded-full text-sm hover:bg-[var(--color-fd-green)] hover:text-white transition-colors"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[var(--color-fd-green)] text-[var(--color-fd-text)]">
      
      {/* ── Banner/Promo bar ── */}
      <div className="bg-[var(--color-fd-green-mid)] text-white text-center text-xs py-2 uppercase tracking-widest font-semibold border-b border-white/10">
        #1 FREEZE-DRIED FRUIT BRAND IN INDIA WITH MORE THAN 1 MILLION HAPPY CUSTOMERS
      </div>

      {/* ════════════════════════════════════════
          1. HERO (Vibrant Yellow Billboard Layout)
      ════════════════════════════════════════ */}
      <section className="bg-[var(--color-fd-yellow)] relative mt-4 mx-4 sm:mx-6 rounded-t-xl overflow-hidden pt-16 pb-24 px-6 text-center shadow-lg">
        {/* Decorative side pattern strips */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 pattern-side-circles opacity-60 mix-blend-multiply pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 pattern-side-circles opacity-60 mix-blend-multiply pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <img src="/images/logo.png" alt="Meelar" className="h-16 w-auto mb-6 brightness-0 opacity-80" />
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[var(--color-fd-green)] tracking-tight">
              Nature&apos;s Zenith, Sealed.
            </h1>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-white text-[var(--color-fd-green)] font-black px-10 py-4 rounded-full text-sm hover:scale-105 transition-transform shadow-md"
          >
            SHOP NOW
          </Link>

          {/* Product Cluster */}
          <div className="mt-16 sm:mt-24 relative h-[350px] sm:h-[450px] lg:h-[500px] w-full flex items-end justify-center pointer-events-none pb-0 max-w-full overflow-hidden sm:overflow-visible gap-2 sm:gap-4 lg:gap-6">
            {/* Floating raw ingredients accent - left */}
            <div className="absolute left-[5%] bottom-20 w-48 h-48 opacity-50 z-0 pointer-events-none hidden sm:block">
               <div className="w-full h-full bg-[var(--color-fd-orange)] rounded-full blur-[60px] mix-blend-overlay" />
            </div>
            {/* Floating raw ingredients accent - right */}
            <div className="absolute right-[10%] bottom-32 w-40 h-40 opacity-40 z-0 pointer-events-none hidden sm:block">
               <div className="w-full h-full bg-[var(--color-fd-lime)] rounded-full blur-[50px] mix-blend-overlay" />
            </div>

            {/* Product 1: Jamun */}
            <div className="relative w-24 sm:w-40 lg:w-56 aspect-[3/4] z-10 origin-bottom opacity-90">
               <Image src={productImages['jamun-pouch'].main} alt="Jamun Pouch" fill className="object-contain drop-shadow-xl object-bottom" unoptimized/>
            </div>
            
            {/* Product 2: Banana */}
            <div className="relative w-24 sm:w-40 lg:w-56 aspect-[3/4] z-20 origin-bottom">
               <Image src={productImages['banana-pouch'].main} alt="Banana Pouch" fill className="object-contain drop-shadow-2xl object-bottom" unoptimized/>
            </div>
            
            {/* Product 3: Mango (Center) */}
            <div className="relative w-24 sm:w-40 lg:w-56 aspect-[3/4] z-30 origin-bottom">
               <Image src={productImages['mango-pouch'].main} alt="Mango Pouch" fill className="object-contain drop-shadow-2xl object-bottom" unoptimized/>
            </div>
            
            {/* Product 4: Guava */}
            <div className="relative w-24 sm:w-40 lg:w-56 aspect-[3/4] z-20 origin-bottom">
               <Image src={productImages['guava-pouch'].main} alt="Guava Pouch" fill className="object-contain drop-shadow-2xl object-bottom" unoptimized/>
            </div>
            
            {/* Product 5: Moringa */}
            <div className="relative w-24 sm:w-40 lg:w-56 aspect-[3/4] z-10 origin-bottom opacity-90">
               <Image src={productImages['moringa-pouch'].main} alt="Moringa Pouch" fill className="object-contain drop-shadow-xl object-bottom" unoptimized/>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. PRODUCT CATEGORIES (Arch Cards)
      ════════════════════════════════════════ */}
      <section className="bg-[var(--color-fd-green)] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-fd-lime)]">
              Superfoods Your Way
            </h2>
            <Link
              href="/shop"
              className="text-[var(--color-fd-lime)] hover:text-white font-semibold text-sm underline underline-offset-8 transition-colors"
            >
              View all products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-[var(--color-fd-cream)] rounded-2xl flex flex-col items-center">
                
                {/* Arch Header */}
                <div 
                  className="w-full pt-8 pb-32 px-4 arch-header mt-3 mx-3 text-center text-white"
                  style={{ backgroundColor: cat.bg, width: 'calc(100% - 24px)' }}
                >
                  <h3 className="font-display font-bold text-lg leading-tight whitespace-pre-line drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>

                {/* Product Image overlapping arch */}
                <div className="relative w-48 h-64 -mt-28 mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                {/* CTA Button */}
                <div className="w-full px-6 pb-6 mt-auto">
                  <Link
                    href={cat.href}
                    className="block w-full text-center bg-[var(--color-fd-green)] text-white font-bold py-3.5 rounded-full text-sm hover:bg-[var(--color-fd-green-mid)] transition-colors shadow-sm"
                  >
                    SHOP
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. TRIBAL EMAIL SIGNUP STRIP
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-6 bg-[var(--color-fd-green)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 tribal-pattern opacity-90 mx-4" />
        
        <div className="relative z-10">
          <EmailSignup />
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. BRAND PILLARS (Semi-circle layout)
      ════════════════════════════════════════ */}
      <section className="bg-[var(--color-fd-green)] py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-fd-lime)] mb-4">
            The World&apos;s Most Powerful Fruits
          </h2>
          <p className="text-white text-lg sm:text-xl font-medium mb-20 max-w-2xl mx-auto">
            FreezeDelights turns global superfoods into lasting impact for your body and our planet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center">
                {/* Semi-circle container with image overlapping */}
                <div className="relative w-48 h-24 mb-14">
                  <div 
                    className="absolute inset-0 semi-circle-bg"
                    style={{ backgroundColor: p.bg }}
                  />
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 drop-shadow-xl z-10">
                     <Image src={p.image} alt={p.alt} fill className="object-contain" unoptimized/>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl text-[var(--color-fd-lime)] mb-3">
                  {p.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed px-4">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-block mt-16 bg-[var(--color-fd-lime)] text-[var(--color-fd-green)] font-extrabold px-12 py-4 rounded-full text-sm hover:scale-105 transition-transform shadow-md tracking-wider uppercase"
          >
            OUR INGREDIENTS
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. ABOUT US BOX (Overlapping background)
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-fd-green)]">
        {/* Ingredient Ticker (Top border) */}
        <div className="bg-[var(--color-fd-lime)] py-3 overflow-hidden border-y border-[var(--color-fd-green)]/20 z-20 relative">
          <div className="marquee-track">
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className="text-[var(--color-fd-green)] font-display font-medium text-lg tracking-widest px-8 whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Large full width image background */}
        <div className="relative h-[600px] w-full">
          <Image
            src="/images/products/mango-cubes.png" // Placeholder for an actual farm/nature background
            alt="Farm background"
            fill
            className="object-cover object-center opacity-40 mix-blend-luminosity brightness-50"
            unoptimized
          />
          <div className="absolute inset-0 bg-[var(--color-fd-green)]/20" />
          
          {/* Floating White Box */}
          <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 bg-white rounded-[2rem] p-10 md:p-14 max-w-[500px] shadow-2xl z-20">
            <h2 className="font-display font-extrabold text-3xl text-[var(--color-fd-green)] mb-6 leading-tight">
              Superfoods for a Superfuture
            </h2>
            <p className="text-[var(--color-fd-text)] text-sm mb-10 leading-relaxed font-medium">
              Starting with the cleanest fruits on the market, we cultivate
              the world&apos;s most potent superfoods in partnership with small
              communities of growers. We carefully craft them into delicious
              cubes, powders, and blends that are packed with positive
              impact for your body, our growers, and the planet.
            </p>
            <Link
              href="/about"
              className="inline-block bg-[var(--color-fd-lime)] text-white font-extrabold px-10 py-3.5 rounded-full text-sm hover:bg-[var(--color-fd-lime-dark)] transition-colors shadow-sm"
            >
              ABOUT US
            </Link>
          </div>
        </div>
      </section>

      {/* ── Floating discount badge (Orange) ── */}
      <Link
        href="/shop?discount=WELCOME15"
        className="fixed bottom-6 left-6 z-50 w-[70px] h-[70px] rounded-full bg-[var(--color-fd-orange)] text-white text-center flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform border-[6px] border-[var(--color-fd-green)]"
      >
        <span className="text-[10px] font-bold leading-tight">
          Unlock<br/>15% Off
        </span>
      </Link>

    </div>
  );
}
