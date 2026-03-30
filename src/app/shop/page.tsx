'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { productImages } from '@/lib/images';

const sculptureProducts = [
  {
    name: 'Mango Cubes',
    subtitle: 'Golden premium cubes',
    price: '$8.50',
    slug: 'mango-cubes',
    image: productImages['mango-cubes'].main,
  },
  {
    name: 'Pineapple Cubes',
    subtitle: 'Tropical tangy bites',
    price: '$8.00',
    slug: 'pineapple-cubes',
    image: productImages['pineapple-cubes'].main,
  },
  {
    name: 'Jackfruit Cubes',
    subtitle: 'Exotic sweetness',
    price: '$9.50',
    slug: 'jackfruit-cubes',
    image: productImages['jackfruit-cubes'].main,
  },
  {
    name: 'Jamun Bites',
    subtitle: 'Exotic antioxidants',
    price: '$9.20',
    slug: 'jamun-cubes',
    image: productImages['jamun-cubes'].main,
  },
  {
    name: 'Banana Slices',
    subtitle: 'Delicate crunch',
    price: '$6.00',
    slug: 'banana-cubes',
    image: productImages['banana-cubes'].main,
  },
];

const vitalityProducts = [
  {
    name: 'Super Moringa',
    subtitle: 'Green life force',
    price: '$12.00',
    slug: 'moringa-powder',
    image: productImages['moringa-powder'].main,
  },
  {
    name: 'Watermelon Splash',
    subtitle: 'Hydrating base',
    price: '$14.00',
    slug: 'watermelon-powder',
    image: productImages['watermelon-powder'].main,
  },
  {
    name: 'Zesty Lemon',
    subtitle: 'Citrus essence',
    price: '$10.50',
    slug: 'lemon-powder',
    image: productImages['lemon-powder'].main,
  },
  {
    name: 'Pineapple Powder',
    subtitle: 'Tropical boost',
    price: '$11.00',
    slug: 'pineapple-powder',
    image: productImages['pineapple-powder'].main,
  },
];

// ── Glass Card Component (Dark Mode) ──
function GlassProductCard({
  product,
  index,
}: {
  product: {
    name: string;
    subtitle: string;
    price: string;
    slug: string;
    image: string;
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      className="h-full"
    >
      <Link href={`/shop/${product.slug}`} className="block h-full cursor-pointer group">
        <div className="glass-card p-6 md:p-8 flex flex-col h-full border border-[var(--color-outline-variant)] relative overflow-hidden">
          
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="flex justify-between items-start mb-4 z-10 text-[var(--color-foreground)]">
            <div className="flex flex-col gap-2">
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight leading-none max-w-[80%] drop-shadow-md">
                {product.name}
              </span>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-sm border border-[var(--color-primary)]/20">100% Pure</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-on-surface-variant)] bg-white/5 px-2 py-0.5 rounded-sm border border-white/10">Export</span>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-20">
              <div className="price-tag-glass group-hover:scale-105">
                {product.price}
              </div>
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full mb-6 mt-2 flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-contain image-zoom drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="mt-auto z-10">
            <div className="luxe-glass p-4 text-center border border-[var(--color-outline-variant)]/50 mb-3 bg-[var(--color-background)]/40">
              <p className="text-sm text-[var(--color-on-surface-variant)] font-bold tracking-widest uppercase opacity-90">{product.subtitle}</p>
            </div>
            
            <div className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-bold text-[var(--color-foreground)] group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-background)] group-hover:border-[var(--color-secondary)] transition-all duration-300 flex items-center justify-center gap-2">
              View Product <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
        </div>
      </Link>
    </motion.div>
  );
}

// ── Header Component ──
function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col mb-16 text-center md:text-left">
      <div className="inline-flex items-center gap-2 luxe-glass px-4 py-2 border-[var(--color-outline-variant)] mx-auto md:mx-0 uppercase tracking-widest text-xs font-bold text-[var(--color-primary)] self-start mb-4 drop-shadow-lg">
        {label}
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-foreground)] font-display leading-[1.1] drop-shadow-sm">
        {title}
      </h2>
      <p className="text-[var(--color-on-surface-variant)] font-medium mt-4 text-lg max-w-2xl tracking-wide">
        {subtitle}
      </p>
    </div>
  );
}

// ── Main Page ──
export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-background)]">
      
      {/* Premium Dark Glass Glowing Ambient Blobs (Site-wide) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[10%] w-[50rem] h-[50rem] bg-[#a7f3d0] opacity-[0.06] blur-[150px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[60rem] h-[60rem] bg-[#fccc4c] opacity-[0.08] blur-[160px] rounded-full" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#34d399] opacity-[0.07] blur-[150px] rounded-full" style={{ animationDelay: '4s' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 luxe-glass px-5 py-2.5 mb-8 border-[var(--color-outline-variant)]"
          >
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] opacity-90" />
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[var(--color-primary)]">
              Premium Catalogue
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', bounce: 0.4 }}
            className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter leading-[1.0] text-[var(--color-foreground)] font-display"
          >
            Purity, Sealed.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-[var(--color-on-surface-variant)] font-medium mt-8 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Experience the zenith of cold-sublimation. Choose from our pristine fruit segments or highly soluble nutrient powders.
          </motion.p>
        </div>
      </section>

      <section className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Segments"
            title="Whole Fruit Preserves"
            subtitle="Cold-sublimated at peak ripeness for an unparalleled snack."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sculptureProducts.map((product, i) => (
              <GlassProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Concentrates"
            title="Vitality Solubles"
            subtitle="99% purity index for your culinary and nutritional creations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vitalityProducts.map((product, i) => (
              <GlassProductCard
                key={product.slug}
                product={product}
                index={i}
              />
            ))}

            {/* Waiting for harvest card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
            >
              <div className="glass-card h-full min-h-[400px] border-dashed border-[var(--color-outline-variant)] flex flex-col items-center justify-center text-center p-10">
                <div className="w-16 h-16 rounded-full luxe-glass flex items-center justify-center mb-6 shadow-lg border-[var(--color-outline-variant)]">
                  <span className="text-2xl text-[var(--color-primary)]">✧</span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3 font-display tracking-tight">New Harvest Soon</h3>
                <p className="text-sm text-[var(--color-on-surface-variant)] font-medium leading-relaxed max-w-[240px] mb-8">
                  We are processing the next exquisite batch of superfoods.
                </p>
                <button className="btn-secondary py-3 px-6 text-sm">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
