'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { productImages } from '@/lib/images';

const sculptureProducts = [
  {
    name: 'Jamun Pouch',
    subtitle: 'Antioxidant treasure',
    price: '₹299',
    slug: 'jamun-pouch',
    image: productImages['jamun-pouch'].main,
  },
  {
    name: 'Banana Pouch',
    subtitle: 'Potassium powerhouse',
    price: '₹199',
    slug: 'banana-pouch',
    image: productImages['banana-pouch'].main,
  },
  {
    name: 'Mango Pouch',
    subtitle: 'Golden vitamin-c',
    price: '₹249',
    slug: 'mango-pouch',
    image: productImages['mango-pouch'].main,
  },
  {
    name: 'Pink Guava Pouch',
    subtitle: 'Lycopene superior',
    price: '₹269',
    slug: 'guava-pouch',
    image: productImages['guava-pouch'].main,
  },
];

const vitalityProducts = [
  {
    name: 'Moringa Pouch',
    subtitle: 'Iron density green',
    price: '₹399',
    slug: 'moringa-pouch',
    image: productImages['moringa-pouch'].main,
  },
];

// ── Solid Vibrant Product Card Component ──
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
        <div className="bg-[var(--color-fd-cream)] p-6 md:p-8 flex flex-col h-full rounded-[2rem] border-2 border-[var(--color-fd-green)]/10 hover:border-[var(--color-fd-green)]/30 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
          
          <div className="flex justify-between items-start mb-4 z-10 text-[var(--color-fd-green)]">
            <div className="flex flex-col gap-2">
              <span className="font-display font-black text-2xl md:text-3xl tracking-tight leading-none max-w-[80%]">
                {product.name}
              </span>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-[var(--color-fd-orange)] px-2 py-0.5 rounded-sm">100% Pure</span>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-white text-[var(--color-fd-green)] font-black text-lg px-4 py-1 rounded-full shadow-md group-hover:scale-105 transition-transform">
                {product.price}
              </div>
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full mb-6 mt-4 flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="mt-auto z-10 space-y-4">
            <p className="text-center text-sm text-[var(--color-fd-text-muted)] font-bold tracking-widest uppercase pb-2 border-b border-[var(--color-fd-green)]/10">
              {product.subtitle}
            </p>
            
            <div className="w-full py-3.5 rounded-full bg-[var(--color-fd-green)] text-white text-center text-sm font-bold group-hover:bg-[var(--color-fd-lime)] group-hover:text-[var(--color-fd-green)] transition-all duration-300 shadow-md">
              Shop Now
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
      <div className="inline-flex items-center gap-2 bg-[var(--color-fd-lime)] px-4 py-2 mx-auto md:mx-0 uppercase tracking-widest text-xs font-bold text-[var(--color-fd-green)] self-start mb-4 shadow-sm rounded-full">
        {label}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-fd-green)] font-display leading-[1.1]">
        {title}
      </h2>
      <p className="text-[var(--color-fd-text-muted)] font-medium mt-4 text-lg max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}

// ── Main Page ──
export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-white text-[var(--color-fd-text)]">
      
      {/* Organic Background Pattern Strip */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[var(--color-fd-green)] tribal-pattern opacity-90 rounded-b-[4rem] z-0" />

      <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[var(--color-fd-cream)] px-5 py-2.5 mb-8 rounded-full shadow-inner"
          >
            <ShieldCheck className="w-5 h-5 text-[var(--color-fd-orange)]" />
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[var(--color-fd-green)]">
              Premium Catalogue
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', bounce: 0.4 }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[1.0] text-[var(--color-fd-green)] font-display"
          >
            Purity, Sealed.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-[var(--color-fd-text-muted)] font-medium mt-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the zenith of cold-sublimation. Choose from our pristine fruit segments or highly soluble nutrient powders.
          </motion.p>
        </div>
      </section>

      <section className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
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

      {/* Break section with pattern */}
      <div className="w-full h-16 bg-[var(--color-fd-yellow)] tribal-pattern opacity-80" />

      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 bg-[var(--color-fd-cream)]">
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
              <div className="bg-white h-full min-h-[400px] rounded-[2rem] border-dashed border-2 border-[var(--color-fd-green)]/30 flex flex-col items-center justify-center text-center p-10 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[var(--color-fd-cream)] flex items-center justify-center mb-6 border border-[var(--color-fd-green)]/10 text-[var(--color-fd-orange)]">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-2xl font-black text-[var(--color-fd-green)] mb-3 font-display tracking-tight">New Harvest Soon</h3>
                <p className="text-sm text-[var(--color-fd-text-muted)] font-medium leading-relaxed max-w-[240px] mb-8">
                  We are processing the next exquisite batch of superfoods.
                </p>
                <button className="border-2 border-[var(--color-fd-green)] text-[var(--color-fd-green)] font-bold py-3 px-6 rounded-full text-sm hover:bg-[var(--color-fd-green)] hover:text-white transition-colors flex items-center">
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
