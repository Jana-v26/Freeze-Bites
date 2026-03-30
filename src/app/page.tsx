'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Globe,
  Package,
  Verified,
} from 'lucide-react';

// ── Image URLs (Local & Remote) ──
import { productImages } from '@/lib/images';

// ── Product data ──
const fruits = [
  {
    name: 'Mango Cubes',
    slug: 'mango-cubes',
    description: 'Golden super-sweet cubes for premium snacking.',
    image: productImages['mango-cubes'].main,
    tags: ['Top Seller', 'Pure'],
    price: '$8.50',
    nutritional: [
      { label: 'Vitamin A', value: '45%' },
      { label: 'Dietary Fiber', value: '3.2g' },
    ],
  },
  {
    name: 'Pineapple Cubes',
    slug: 'pineapple-cubes',
    description: 'Tropical tangy cubes, vibrant and refreshing.',
    image: productImages['pineapple-cubes'].main,
    tags: ['Vitamin C', 'Tangy'],
    price: '$8.00',
    nutritional: [
      { label: 'Vitamin C', value: 'High' },
      { label: 'Digestion', value: 'Bromelain' },
    ],
  },
  {
    name: 'Jackfruit Cubes',
    slug: 'jackfruit-cubes',
    description: 'Sweet and exotic tropical bites.',
    image: productImages['jackfruit-cubes'].main,
    tags: ['Exotic', 'High Energy'],
    price: '$9.50',
    nutritional: [
      { label: 'Vitamin C', value: 'Good' },
      { label: 'Potassium', value: 'Rich' },
    ],
  },
  {
    name: 'Black Plum (Jamun)',
    slug: 'jamun-cubes',
    description: 'Exotic purple power bites packed with antioxidants.',
    image: productImages['jamun-cubes'].main,
    tags: ['Antioxidant', 'Wild Harvest'],
    price: '$9.20',
    nutritional: [
      { label: 'Anthocyanins', value: 'Exceptional' },
      { label: 'Iron Content', value: 'Rich' },
    ],
  },
  {
    name: 'Banana Crisp',
    slug: 'banana-cubes',
    description: 'Naturally sweet slices with a delicate crunch.',
    image: productImages['banana-cubes'].main,
    tags: ['Energy Boost', 'Potassium'],
    price: '$6.00',
    nutritional: [
      { label: 'Potassium', value: '360mg' },
      { label: 'Energy Density', value: 'High' },
    ],
  },
];

const powders = [
  {
    name: 'Pure Moringa',
    slug: 'moringa-powder',
    description: 'Bright green life force.',
    image: productImages['moringa-powder'].main,
    hoverText: '99.8% Purity Index',
    price: '$12.00',
  },
  {
    name: 'Watermelon Splash',
    slug: 'watermelon-powder',
    description: 'Summery hydration.',
    image: productImages['watermelon-powder'].main,
    hoverText: 'Instant Solubility',
    price: '$14.00',
  },
  {
    name: 'Zesty Lemon',
    slug: 'lemon-powder',
    description: 'Sunny citrus joy.',
    image: productImages['lemon-powder'].main,
    hoverText: 'Vitamin C Focus',
    price: '$10.50',
  },
  {
    name: 'Pineapple Powder',
    slug: 'pineapple-powder',
    description: 'Tropical tangy boost.',
    image: productImages['pineapple-powder'].main,
    hoverText: 'Great for mixing',
    price: '$11.00',
  },
];

// ── Animated section wrapper ──
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ── Main page ──
export default function HomePage() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen relative">
      
      {/* Premium Dark Glass Glowing Ambient Blobs (Site-wide) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[50rem] h-[50rem] bg-[#a7f3d0] opacity-[0.06] blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[-15%] w-[60rem] h-[60rem] bg-[#fccc4c] opacity-[0.08] blur-[160px] rounded-full" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-[#34d399] opacity-[0.07] blur-[140px] rounded-full" style={{ animationDelay: '4s' }} />
      </div>

      {/* ═══════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center w-full pt-28 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left column */}
            <div className="z-10 relative">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 luxe-glass px-5 py-2.5 mb-8"
              >
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] opacity-90" />
                <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[var(--color-primary)]">
                  Premium Quality Exports
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-[var(--color-foreground)] leading-[1.05] font-display"
              >
                Nature&apos;s Essence,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#8bcdae]">Freeze-Dried</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg md:text-xl text-[var(--color-on-surface-variant)] font-medium mt-8 max-w-lg leading-relaxed"
              >
                We bridge the gap between tropical orchards and international markets with premium freeze-dried products — preserving 97% of nature&apos;s goodness in every bite.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link href="/shop" className="btn-primary">
                  Explore Catalogue
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="btn-secondary">
                   <Play className="w-4 h-4 mr-2 opacity-80" />
                   Process Film
                </button>
              </motion.div>
            </div>

            {/* Right column — Static, High-Clarity "Family Bundle" lineup with project images and background text */}
            <div className="relative hidden lg:flex items-center justify-center z-10 w-full max-w-2xl mx-auto h-[650px] mt-12 bg-transparent overflow-visible">
              
              {/* Massive Stylized Background Text Layer (SWEET-style inspiration) */}
              <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center select-none pointer-events-none z-0 opacity-[0.03]">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-display font-black text-[16rem] leading-[0.75] tracking-tighter text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.1)] uppercase whitespace-nowrap"
                >
                  Freeze
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="font-display font-black text-[16rem] leading-[0.75] tracking-tighter text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.1)] uppercase whitespace-nowrap"
                >
                  Dance
                </motion.h2>
              </div>

              {/* Product Bundle — High Clarity Static Cluster */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                
                {/* Back Left — Pineapple (Tucked Behind) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -80, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, x: -90, rotate: -12 }}
                  transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: -5, zIndex: 45 }}
                  className="absolute left-[15%] bottom-[150px] w-56 aspect-[4/5] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 p-2 z-20 cursor-pointer overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={productImages['pineapple-cubes'].main}
                      alt="Pineapple Cubes"
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Back Right — Banana (Tucked Behind) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 80, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 90, rotate: 12 }}
                  transition={{ duration: 0.8, delay: 0.6, type: 'spring', bounce: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 5, zIndex: 45 }}
                  className="absolute right-[15%] bottom-[160px] w-52 aspect-[4/5] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 p-2 z-20 cursor-pointer overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={productImages['banana-cubes'].main}
                      alt="Banana Cubes"
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Center Primary — Mango (Hero Product) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
                  transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-12 w-64 aspect-[4/5] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-2 border-white/60 p-4 z-40 cursor-pointer overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <Image
                      src={productImages['mango-cubes'].main}
                      alt="Mango Cubes"
                      fill
                      className="object-contain p-2 hover:scale-110 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] uppercase tracking-widest font-black text-white bg-[var(--color-primary)] px-3 py-1.5 rounded-full shadow-lg">
                        Best Seller
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Foreground — Moringa Sachet (Leaning Front) */}
                <motion.div
                  initial={{ opacity: 0, x: 100, y: 100, rotate: 35 }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 22 }}
                  transition={{ duration: 1, delay: 0.7, type: 'spring', bounce: 0.3 }}
                  whileHover={{ scale: 1.25, rotate: 10, zIndex: 60 }}
                  className="absolute bottom-20 right-[10%] w-32 aspect-[3/4] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/50 p-2.5 z-55 cursor-pointer overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={productImages['moringa-powder'].main}
                      alt="Moringa Powder"
                      fill
                      className="object-contain p-1 hover:scale-110 transition-transform duration-500"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Anchored Premium Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[85%] z-[60] luxe-glass px-8 py-5 flex items-center justify-center gap-5 border border-white/30 shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full border border-[var(--color-secondary)]/40 flex items-center justify-center bg-[var(--color-secondary)]/20 shadow-inner">
                    <Verified className="w-6 h-6 text-[var(--color-secondary)]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-black text-[var(--color-foreground)] text-sm uppercase tracking-wider font-display">
                      Signature Family Bundle
                    </p>
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-1 font-bold tracking-wide opacity-80">
                      ISO 22000 Certified Quality • 100% Raw Bioavailable
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SIGNATURE FRUIT COLLECTION (Glass Cards)
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-extrabold text-[var(--color-secondary)] uppercase tracking-[0.2em] mb-3 drop-shadow-sm">Premium Tier</p>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight">
                Signature Collection
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fruits.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.3 }}
              >
                <Link href={`/shop/${product.slug}`} className="block h-full cursor-pointer group">
                  <div className="glass-card h-full min-h-[520px] flex flex-col p-6 border border-[var(--color-outline-variant)]">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 z-10 text-[var(--color-foreground)]">
                       <span className="font-display font-bold text-2xl tracking-tight drop-shadow-md">
                         {product.name}
                       </span>
                    </div>

                    {/* Price Pill Glass */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="price-tag-glass font-display tracking-tight hover:scale-105">
                        {product.price}
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative flex-grow flex items-center justify-center w-full mb-6 mt-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain image-zoom"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/90 to-transparent p-6 pt-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-b-xl z-10 flex flex-col justify-end">
                        <div className="space-y-3">
                          {product.nutritional.map((item) => (
                            <div key={item.label} className="flex justify-between items-center text-[var(--color-foreground)] border-b border-white/10 pb-1.5 last:border-0">
                              <span className="text-xs uppercase tracking-wider font-bold opacity-80">{item.label}</span>
                              <span className="text-sm font-extrabold text-[var(--color-primary)] tracking-wide">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Details */}
                    <div className="luxe-glass p-4 mt-auto rounded-xl border border-[var(--color-outline-variant)]">
                      <p className="text-sm text-[var(--color-on-surface-variant)] font-medium leading-relaxed mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-[var(--color-foreground)] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════
          NUTRIENT-DENSE MICRO-POWDERS
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-24 relative overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <p className="text-sm font-extrabold text-[var(--color-secondary)] uppercase tracking-[0.2em] mb-3 drop-shadow-sm">Concentrates</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight font-display">
              Nutrient-Dense Micro-Powders
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {powders.map((powder, i) => (
              <motion.div
                key={powder.slug}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="glass-card p-5 flex flex-col h-full min-h-[380px] border border-[var(--color-outline-variant)] hover:border-[var(--color-primary)]/40 transition-colors">
                  <div className="flex justify-between items-start mb-4 z-10">
                     <span className="text-sm font-bold text-[var(--color-primary)] tracking-wider opacity-90">{powder.price}</span>
                  </div>
                  
                  <div className="aspect-square relative flex-grow mb-4 flex items-center justify-center">
                    <Image
                      src={powder.image}
                      alt={powder.name}
                      fill
                      unoptimized
                      className="object-contain image-zoom"
                    />
                  </div>
                  
                  <div className="luxe-glass p-3 text-center rounded-xl border border-white/5">
                    <h3 className="text-base font-bold text-[var(--color-foreground)] font-display tracking-tight">{powder.name}</h3>
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">{powder.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════
          EXPORT INFRASTRUCTURE
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-24 mt-12 mb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="luxe-glass p-8 md:p-16 rounded-[3rem] border border-[var(--color-outline-variant)] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              
              {/* LEFT — Image collage & Core values */}
              <div className="grid grid-cols-2 gap-6 relative">
                
                <div className="space-y-6 relative z-10">
                  <div className="luxe-glass rounded-3xl h-72 flex flex-col items-center justify-center text-center p-8 border border-[var(--color-outline-variant)] bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-background)]">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                      <Globe className="w-8 h-8 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[var(--color-foreground)] mb-2">Export Quality</h3>
                    <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">Supplying premium grade produce to global markets seamlessly.</p>
                  </div>
                  <div className="glass-card p-6 flex items-center justify-center text-center">
                    <p className="font-bold text-[var(--color-foreground)] text-sm uppercase tracking-[0.2em] font-display">Global Reach</p>
                  </div>
                </div>
                
                <div className="space-y-6 pt-12 relative z-10">
                  <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center mb-3 bg-[var(--color-primary)]/10">
                      <Verified className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <p className="font-bold text-[var(--color-foreground)] text-sm uppercase tracking-wider font-display">Zero Additives</p>
                  </div>
                  <div className="luxe-glass rounded-3xl h-64 flex flex-col items-center justify-center p-8 border border-[var(--color-outline-variant)] bg-[var(--color-tertiary)]/70">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-8 h-8 text-[var(--color-secondary)]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[var(--color-foreground)] mb-2">Certified Pure</h3>
                    <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed text-center">ISO 22000 quality control for maximum unadulterated purity.</p>
                  </div>
                </div>
              </div>

              {/* RIGHT — Text content */}
              <div>
                <p className="text-sm font-extrabold text-[var(--color-secondary)] uppercase tracking-[0.2em] mb-4 drop-shadow-md">
                  Infrastructure
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight font-display mb-8">
                  Built for Maximum Purity.
                </h2>
                <p className="text-[var(--color-on-surface-variant)] text-lg leading-relaxed mb-10 font-medium tracking-wide">
                  Our vertically integrated pipeline ensures every single product reaches your door with uncompromised quality, retaining 97% of its nutritional value and brilliant natural flavor.
                </p>

                <div className="space-y-8">
                  {/* Feature 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-6 group items-start"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl luxe-glass border border-[var(--color-outline-variant)] flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10 transition-all">
                      <Package className="w-6 h-6 text-[var(--color-primary)] drop-shadow-sm" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-[var(--color-foreground)] mb-2 tracking-tight">Cold-Sublimation Tech</h4>
                      <p className="text-[var(--color-on-surface-variant)] leading-relaxed text-sm font-medium tracking-wide">
                        Our process locks in vital nutrients, brilliant flavor, and unadulterated natural color deep inside the fruit.
                      </p>
                    </div>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-6 group items-start"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl luxe-glass border border-[var(--color-outline-variant)] flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10 transition-all">
                      <Globe className="w-6 h-6 text-[var(--color-primary)] drop-shadow-sm" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-[var(--color-foreground)] mb-2 tracking-tight">Bespoke White-Label</h4>
                      <p className="text-[var(--color-on-surface-variant)] leading-relaxed text-sm font-medium tracking-wide">
                        End-to-end private-label services with custom packaging and rigorous global standards.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
