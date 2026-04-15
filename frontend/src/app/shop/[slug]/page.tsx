'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Plus, Minus, ArrowRight,
  Sun, Zap, Shield, Droplets,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// ─── Product image URLs ────────────────────────────────────────
const productImageURLs: Record<string, string> = {
  'mango-cubes': '/images/products/mango-cubes.png',
  'pineapple-cubes': '/images/products/pineapple-cubes.png',
  'jamun-cubes': '/images/products/jamun-cubes.png',
  'banana-cubes': '/images/products/banana-cubes.png',
  'jackfruit-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd2N03cVfTXlcXqr0JmY-7d7bw5jmBa8QQ2mh05OnzUmuVdD6hS1BXICKHJjZzIOn-6ri-z57Kh6o4I_t8D2ImSClZLk9iAuje3IsvLEfd3ZzbgYR0epblA2Y07omTH55rB6d84p1PsTydtdbBe1OI8HoF1wgIcRRhTtGzfS2ucJzbxboZBv0hJDSEW69-OFvfrhgS1Kx4Z-729Ibw4-0zXJZoe99R7_2qxveEJIiixc3K4TFHIVlqI4pJ7fdGPXk6HQGp-uGQkUmM',
  'jamun-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1D9Ulrmt6M5GvNN_fko0dUtrPS-AroXAlpOthD1kgOzJL4ULEL4QsqdLaEkH4OAojxi_RmH0XGb_7mZnt8GbPyyNDB91DDmF-4ijIfIbCXsnfDt96z_r2Hx78fl6CRBgL9zNfJQIPCy3aR4Jz-lUncyATk_Kbi7CZ3DsCSEV7tux5TujTSFWAjuAl-1x4YTgJcxvMedSJSYEco1Tbw6ATX7UKJ0oe1ecnXajerhcW3TOP6kFXlfSxFiZ0Egd2onHkF6CizZdFB35',
  'mango-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmnILGSlVSSNZzJLrKf7WAygot5YtJJFwKhQ7Sa2Net_U8ICKmtVUpWHkmQA3M5oKdchZrV_GcmJp-F1ipnoksXyNsyhnEvy86vFg5VnAOi1Z46Tk55EVeAhgC9Fz2WYIJ1K37Gy17RXpstKLqr-hugRw0YJD3WaghGcogZZ6YfjAZreUqVkeGVjAFhJNMag-GHTZHOATC8HNYGH-nkIpTbdOZ3LeqsmW5NLHdJ9qaSF5cgyZHbdFoVK7Mn7olBKF6oosY6lxVvSze',
  'pineapple-powder': '/images/products/pineapple-powder.png',
  'moringa-powder': '/images/products/moringa-powder.png',
};

// ─── Icon type ─────────────────────────────────────────────────
type IconComponent = React.ComponentType<{ className?: string }>;

// ─── Static product data ────────────────────────────────────────
interface Variant {
  id: number;
  name: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
}

interface NutritionRow {
  label: string;
  value: string;
}

interface ProductData {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  categorySlug: string;
  format: string;
  description: string;
  bgTint: string;
  benefits: { icon: IconComponent; title: string; desc: string }[];
  variants: Variant[];
  nutrition: NutritionRow[];
  specs: { weight: string; shelfLife: string; certified: string };
}

const productsData: Record<string, ProductData> = {
  'mango-cubes': {
    id: 1, name: 'Mango Cubes', slug: 'mango-cubes', price: 249,
    category: 'Freeze Dried Fruit', categorySlug: 'cubes', format: 'Cubes',
    bgTint: 'bg-[#fffbeb]',
    description: 'Our premium freeze-dried mango cubes capture the essence of sun-ripened Alphonso mangoes from the Konkan region. Each cube delivers an intense burst of tropical sweetness with a satisfying crunch that melts on your tongue.',
    benefits: [
      { icon: Sun, title: 'Rich in Vitamin A', desc: 'Supports healthy vision and immune function' },
      { icon: Zap, title: 'Natural Energy', desc: 'Quick energy boost from natural fruit sugars' },
      { icon: Shield, title: 'Antioxidant Rich', desc: 'Fights free radicals with beta-carotene' },
      { icon: Droplets, title: '97% Nutrients', desc: 'Freeze-drying preserves almost all nutrients' },
    ],
    variants: [
      { id: 1, name: '50g Pack', weight: '50g', price: 249, compareAtPrice: 299, sku: 'MC-50' },
      { id: 2, name: '100g Pack', weight: '100g', price: 449, compareAtPrice: 549, sku: 'MC-100' },
      { id: 3, name: '250g Pack', weight: '250g', price: 999, compareAtPrice: 1249, sku: 'MC-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '68 kcal' },
      { label: 'Protein', value: '0.8g' },
      { label: 'Carbohydrates', value: '17g' },
      { label: 'Dietary Fiber', value: '1.8g' },
      { label: 'Vitamin A', value: '54mcg (36% DV)' },
      { label: 'Vitamin C', value: '36mg (60% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '12 months', certified: 'FSSAI Certified' },
  },
  'pineapple-cubes': {
    id: 2, name: 'Pineapple Cubes', slug: 'pineapple-cubes', price: 279,
    category: 'Freeze Dried Fruit', categorySlug: 'cubes', format: 'Cubes',
    bgTint: 'bg-[#fffbeb]',
    description: 'Tangy and sweet freeze-dried pineapple cubes sourced from the finest tropical farms. Each piece retains the vibrant flavor and nutritional benefits of fresh pineapple with a delightful airy crunch.',
    benefits: [
      { icon: Zap, title: 'Bromelain Rich', desc: 'Natural enzyme that aids digestion' },
      { icon: Shield, title: 'Vitamin C Boost', desc: 'Supports immune system health' },
      { icon: Droplets, title: 'Anti-inflammatory', desc: 'Natural anti-inflammatory properties' },
      { icon: Sun, title: 'Manganese Source', desc: 'Essential mineral for bone health' },
    ],
    variants: [
      { id: 4, name: '50g Pack', weight: '50g', price: 279, compareAtPrice: 329, sku: 'PC-50' },
      { id: 5, name: '100g Pack', weight: '100g', price: 499, compareAtPrice: 599, sku: 'PC-100' },
      { id: 6, name: '250g Pack', weight: '250g', price: 1099, compareAtPrice: 1349, sku: 'PC-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '50 kcal' },
      { label: 'Protein', value: '0.5g' },
      { label: 'Carbohydrates', value: '13g' },
      { label: 'Dietary Fiber', value: '1.4g' },
      { label: 'Vitamin C', value: '47mg (78% DV)' },
      { label: 'Manganese', value: '0.9mg (39% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '12 months', certified: 'FSSAI Certified' },
  },
  'jamun-cubes': {
    id: 3, name: 'Jamun Cubes', slug: 'jamun-cubes', price: 299,
    category: 'Freeze Dried Fruit', categorySlug: 'cubes', format: 'Cubes',
    bgTint: 'bg-[#f5f0ff]',
    description: 'Rare and exquisite freeze-dried jamun cubes that capture the deep, complex flavor of Indian blackberries. Rich in anthocyanins and naturally beneficial for blood sugar management.',
    benefits: [
      { icon: Shield, title: 'Blood Sugar Support', desc: 'Traditionally used for blood sugar management' },
      { icon: Zap, title: 'Anthocyanin Rich', desc: 'Powerful antioxidant with deep purple pigment' },
      { icon: Droplets, title: 'Iron Boost', desc: 'Natural source of iron for hemoglobin' },
      { icon: Sun, title: 'Digestive Aid', desc: 'Supports healthy digestion naturally' },
    ],
    variants: [
      { id: 7, name: '50g Pack', weight: '50g', price: 299, compareAtPrice: 349, sku: 'JC-50' },
      { id: 8, name: '100g Pack', weight: '100g', price: 549, compareAtPrice: 649, sku: 'JC-100' },
      { id: 9, name: '250g Pack', weight: '250g', price: 1199, compareAtPrice: 1449, sku: 'JC-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '62 kcal' },
      { label: 'Protein', value: '0.7g' },
      { label: 'Carbohydrates', value: '14g' },
      { label: 'Dietary Fiber', value: '2.5g' },
      { label: 'Iron', value: '1.2mg (15% DV)' },
      { label: 'Anthocyanins', value: '120mg' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '12 months', certified: 'FSSAI Certified' },
  },
  'banana-cubes': {
    id: 4, name: 'Banana Cubes', slug: 'banana-cubes', price: 199,
    category: 'Freeze Dried Fruit', categorySlug: 'cubes', format: 'Cubes',
    bgTint: 'bg-[#fffbeb]',
    description: 'Naturally sweet freeze-dried banana cubes made from perfectly ripe Robusta bananas. A versatile snack that works great on its own, in cereals, or as a baking ingredient.',
    benefits: [
      { icon: Zap, title: 'Potassium Rich', desc: 'Supports heart health and muscle function' },
      { icon: Sun, title: 'Vitamin B6', desc: 'Essential for brain development and function' },
      { icon: Droplets, title: 'Natural Fiber', desc: 'Promotes healthy digestion' },
      { icon: Shield, title: 'Energy Boost', desc: 'Quick natural energy from fruit sugars' },
    ],
    variants: [
      { id: 10, name: '50g Pack', weight: '50g', price: 199, compareAtPrice: 249, sku: 'BC-50' },
      { id: 11, name: '100g Pack', weight: '100g', price: 359, compareAtPrice: 449, sku: 'BC-100' },
      { id: 12, name: '250g Pack', weight: '250g', price: 799, compareAtPrice: 999, sku: 'BC-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '89 kcal' },
      { label: 'Protein', value: '1.1g' },
      { label: 'Carbohydrates', value: '23g' },
      { label: 'Dietary Fiber', value: '2.6g' },
      { label: 'Potassium', value: '358mg (10% DV)' },
      { label: 'Vitamin B6', value: '0.4mg (20% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '12 months', certified: 'FSSAI Certified' },
  },
  'jackfruit-cubes': {
    id: 5, name: 'Jackfruit Cubes', slug: 'jackfruit-cubes', price: 319,
    category: 'Freeze Dried Fruit', categorySlug: 'cubes', format: 'Cubes',
    bgTint: 'bg-[#fef9ee]',
    description: 'Premium freeze-dried jackfruit cubes that capture the unique honey-like sweetness of ripe jackfruit. A tropical delicacy that offers an exotic snacking experience with every bite.',
    benefits: [
      { icon: Shield, title: 'Vitamin C', desc: 'Boosts immune function and skin health' },
      { icon: Zap, title: 'Dietary Fiber', desc: 'Promotes digestive wellness' },
      { icon: Sun, title: 'Carotenoids', desc: 'Supports eye health and vision' },
      { icon: Droplets, title: 'Minerals', desc: 'Rich in magnesium and potassium' },
    ],
    variants: [
      { id: 13, name: '50g Pack', weight: '50g', price: 319, compareAtPrice: 379, sku: 'JF-50' },
      { id: 14, name: '100g Pack', weight: '100g', price: 579, compareAtPrice: 699, sku: 'JF-100' },
      { id: 15, name: '250g Pack', weight: '250g', price: 1299, compareAtPrice: 1549, sku: 'JF-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '95 kcal' },
      { label: 'Protein', value: '1.7g' },
      { label: 'Carbohydrates', value: '23g' },
      { label: 'Dietary Fiber', value: '1.5g' },
      { label: 'Vitamin C', value: '13.7mg (23% DV)' },
      { label: 'Potassium', value: '448mg (13% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '12 months', certified: 'FSSAI Certified' },
  },
  'jamun-powder': {
    id: 6, name: 'Jamun Powder', slug: 'jamun-powder', price: 349,
    category: 'Fruit Powder', categorySlug: 'powders', format: 'Powder',
    bgTint: 'bg-[#f5f0ff]',
    description: 'Pure freeze-dried jamun powder made from handpicked Indian blackberries. Traditionally valued in Ayurveda for blood sugar management, this superfood powder blends seamlessly into smoothies, yogurt, and juices.',
    benefits: [
      { icon: Shield, title: 'Blood Sugar Support', desc: 'Ayurvedic superfood for glucose management' },
      { icon: Zap, title: 'Antioxidant Power', desc: 'Rich in anthocyanins and polyphenols' },
      { icon: Droplets, title: 'Iron Rich', desc: 'Natural source of iron and minerals' },
      { icon: Sun, title: 'Gut Health', desc: 'Supports healthy gut microbiome' },
    ],
    variants: [
      { id: 16, name: '50g Pack', weight: '50g', price: 349, compareAtPrice: 399, sku: 'JP-50' },
      { id: 17, name: '100g Pack', weight: '100g', price: 629, compareAtPrice: 749, sku: 'JP-100' },
      { id: 18, name: '250g Pack', weight: '250g', price: 1399, compareAtPrice: 1699, sku: 'JP-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '60 kcal' },
      { label: 'Protein', value: '0.7g' },
      { label: 'Carbohydrates', value: '14g' },
      { label: 'Dietary Fiber', value: '3.2g' },
      { label: 'Iron', value: '1.6mg (20% DV)' },
      { label: 'Anthocyanins', value: '180mg' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '18 months', certified: 'FSSAI Certified' },
  },
  'mango-powder': {
    id: 7, name: 'Mango Powder', slug: 'mango-powder', price: 299,
    category: 'Fruit Powder', categorySlug: 'powders', format: 'Powder',
    bgTint: 'bg-[#fffbeb]',
    description: 'Vibrant freeze-dried mango powder from premium Alphonso mangoes. Add a tropical twist to your smoothies, desserts, ice cream, or baking recipes. Pure fruit, no added sugar or preservatives.',
    benefits: [
      { icon: Sun, title: 'Vitamin A Powerhouse', desc: 'Supports vision and skin health' },
      { icon: Shield, title: 'Immune Booster', desc: 'High vitamin C content for immunity' },
      { icon: Zap, title: 'Natural Flavor', desc: 'Perfect for smoothies and desserts' },
      { icon: Droplets, title: 'Folate Rich', desc: 'Supports cell growth and metabolism' },
    ],
    variants: [
      { id: 19, name: '50g Pack', weight: '50g', price: 299, compareAtPrice: 349, sku: 'MP-50' },
      { id: 20, name: '100g Pack', weight: '100g', price: 549, compareAtPrice: 649, sku: 'MP-100' },
      { id: 21, name: '250g Pack', weight: '250g', price: 1199, compareAtPrice: 1449, sku: 'MP-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '68 kcal' },
      { label: 'Protein', value: '0.8g' },
      { label: 'Carbohydrates', value: '17g' },
      { label: 'Dietary Fiber', value: '1.8g' },
      { label: 'Vitamin A', value: '54mcg (36% DV)' },
      { label: 'Vitamin C', value: '36mg (60% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '18 months', certified: 'FSSAI Certified' },
  },
  'pineapple-powder': {
    id: 8, name: 'Pineapple Powder', slug: 'pineapple-powder', price: 299,
    category: 'Fruit Powder', categorySlug: 'powders', format: 'Powder',
    bgTint: 'bg-[#fffbeb]',
    description: 'Pure freeze-dried pineapple powder packed with bromelain and digestive enzymes. A tangy, tropical addition to your smoothies, marinades, and health drinks that supports digestion naturally.',
    benefits: [
      { icon: Zap, title: 'Digestive Enzymes', desc: 'Natural bromelain for better digestion' },
      { icon: Shield, title: 'Anti-inflammatory', desc: 'Helps reduce inflammation naturally' },
      { icon: Sun, title: 'Vitamin C', desc: 'Powerful immune system support' },
      { icon: Droplets, title: 'Versatile Use', desc: 'Great in drinks, marinades, and desserts' },
    ],
    variants: [
      { id: 22, name: '50g Pack', weight: '50g', price: 299, compareAtPrice: 349, sku: 'PP-50' },
      { id: 23, name: '100g Pack', weight: '100g', price: 549, compareAtPrice: 649, sku: 'PP-100' },
      { id: 24, name: '250g Pack', weight: '250g', price: 1199, compareAtPrice: 1449, sku: 'PP-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '50 kcal' },
      { label: 'Protein', value: '0.5g' },
      { label: 'Carbohydrates', value: '13g' },
      { label: 'Dietary Fiber', value: '1.4g' },
      { label: 'Vitamin C', value: '47mg (78% DV)' },
      { label: 'Bromelain', value: '80 GDU' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '18 months', certified: 'FSSAI Certified' },
  },
  'moringa-powder': {
    id: 9, name: 'Moringa Powder', slug: 'moringa-powder', price: 399,
    category: 'Superfood Powder', categorySlug: 'powders', format: 'Powder',
    bgTint: 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20',
    description: 'Premium freeze-dried moringa leaf powder, often called the "miracle tree" superfood. Loaded with vitamins, minerals, and amino acids, moringa is one of the most nutrient-dense foods on the planet.',
    benefits: [
      { icon: Zap, title: '7x Vitamin C', desc: 'Seven times more vitamin C than oranges' },
      { icon: Shield, title: 'Complete Protein', desc: 'Contains all 9 essential amino acids' },
      { icon: Sun, title: 'Iron & Calcium', desc: '3x iron of spinach, 4x calcium of milk' },
      { icon: Droplets, title: 'Anti-aging', desc: 'Powerful antioxidants fight aging at cellular level' },
    ],
    variants: [
      { id: 25, name: '50g Pack', weight: '50g', price: 399, compareAtPrice: 449, sku: 'MR-50' },
      { id: 26, name: '100g Pack', weight: '100g', price: 729, compareAtPrice: 849, sku: 'MR-100' },
      { id: 27, name: '250g Pack', weight: '250g', price: 1599, compareAtPrice: 1899, sku: 'MR-250' },
    ],
    nutrition: [
      { label: 'Calories', value: '64 kcal' },
      { label: 'Protein', value: '6.7g' },
      { label: 'Carbohydrates', value: '8.3g' },
      { label: 'Dietary Fiber', value: '3.2g' },
      { label: 'Iron', value: '4mg (50% DV)' },
      { label: 'Calcium', value: '185mg (19% DV)' },
    ],
    specs: { weight: '50g / 100g / 250g', shelfLife: '18 months', certified: 'FSSAI Certified' },
  },
};

// Related products (excluding current, return 3)
function getRelatedProducts(currentSlug: string) {
  return Object.values(productsData)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);
}

// ─── Main Product Detail Page ───────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productsData[slug];

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const nutritionRef = useRef(null);
  const nutritionInView = useInView(nutritionRef, { once: true, margin: '-80px' });
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: '-80px' });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Product Not Found
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop">
            <button className="btn-primary">
              Back to Shop
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const relatedProducts = getRelatedProducts(slug);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addItem(product.id, currentVariant.id, quantity);
    } catch {
      // Error handled by cart store
    } finally {
      setTimeout(() => setIsAddingToCart(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-fd-cream)] text-[var(--color-fd-text)]">

      {/* ═══ BREADCRUMB ═══ */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-[var(--color-fd-text-muted)] font-bold"
        >
          <Link href="/" className="hover:text-[var(--color-fd-green)] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-[var(--color-fd-green)] transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[var(--color-fd-green)]">{product.name}</span>
        </motion.div>
      </nav>

      {/* ═══ PRODUCT HERO ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="bg-white rounded-[3rem] p-6 sm:p-10 shadow-sm border-2 border-[var(--color-fd-green)]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left: Product Image — 6 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative aspect-[4/5] bg-[var(--color-fd-cream)] rounded-[2rem] overflow-hidden border-2 border-[var(--color-fd-green)]/5 flex items-center justify-center p-8">
                {/* Sunburst background effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, var(--color-fd-yellow) 15deg 30deg)' }} />
                
                <Image
                  src={productImageURLs[product.slug]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-2xl z-10 p-12 hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                <div className="absolute top-6 right-6 bg-white border-2 border-[var(--color-fd-green)]/20 text-[var(--color-fd-green)] text-xs font-black px-4 py-2 rounded-[1rem] shadow-sm z-20">
                  {product.format}
                </div>
              </div>
            </motion.div>

            {/* Right: Product Info — 6 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* 100% Natural badge */}
              <span className="inline-flex items-center self-start bg-[var(--color-fd-orange)] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-[1rem] mb-4 shadow-sm">
                100% NATURAL
              </span>

              {/* Product name */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[var(--color-fd-green)] leading-[1.0] mb-4 font-display">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-[var(--color-fd-text-muted)] leading-relaxed text-[15px] font-medium mb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-xs font-black text-[var(--color-fd-green)] uppercase tracking-wide mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.id}
                      onClick={() => { setSelectedVariant(i); setQuantity(1); }}
                      className={`px-6 py-3 rounded-[1rem] text-sm font-bold border-2 transition-all duration-200 shadow-sm ${
                        selectedVariant === i
                          ? 'bg-[var(--color-fd-green)] text-white border-[var(--color-fd-green)]'
                          : 'bg-white text-[var(--color-fd-green)] border-[var(--color-fd-green)]/20 hover:border-[var(--color-fd-green)]'
                      }`}
                    >
                      {variant.weight}
                      {selectedVariant === i && (
                        <span className="ml-2 font-black text-[var(--color-fd-yellow)]">{'\u20B9'}{variant.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-8 mt-2 items-start sm:items-end">
                {/* Quantity Selector */}
                <div>
                  <h3 className="text-xs font-black text-[var(--color-fd-green)] uppercase tracking-wide mb-3">Quantity</h3>
                  <div className="inline-flex items-center bg-white border-2 border-[var(--color-fd-green)]/20 rounded-[1rem] p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[var(--color-fd-green)] hover:bg-[var(--color-fd-cream)] rounded-[0.5rem] transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-black text-[var(--color-fd-green)]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-[var(--color-fd-green)] hover:bg-[var(--color-fd-cream)] rounded-[0.5rem] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price display */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-black text-[var(--color-fd-green)] font-display">
                      {'\u20B9'}{currentVariant.price * quantity}
                    </span>
                    {currentVariant.compareAtPrice && (
                      <span className="text-lg text-[var(--color-fd-orange)] font-bold line-through">
                        {'\u20B9'}{currentVariant.compareAtPrice * quantity}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[var(--color-fd-lime)] text-[var(--color-fd-green)] border-2 border-[var(--color-fd-green)] font-black py-4 rounded-[1.5rem] text-[15px] hover:bg-[var(--color-fd-yellow)] transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  <AnimatePresence mode="wait">
                    {isAddingToCart ? (
                      <motion.span key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Adding...
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <Link href="/checkout" className="flex-1">
                  <button className="w-full bg-[var(--color-fd-green)] text-white border-2 border-[var(--color-fd-green)] font-black py-4 rounded-[1.5rem] text-[15px] hover:bg-[var(--color-fd-lime)] hover:text-[var(--color-fd-green)] transition-colors shadow-md">
                    Buy Now
                  </button>
                </Link>
              </div>

              {/* Specs Row: 3 columns */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--color-fd-cream)] border-2 border-[var(--color-fd-green)]/10 rounded-[1.5rem] p-3 text-center transition-colors hover:border-[var(--color-fd-green)]/20">
                  <p className="text-[10px] text-[var(--color-fd-text-muted)] font-black uppercase tracking-wider mb-1">Weight</p>
                  <p className="text-[13px] font-bold text-[var(--color-fd-green)]">{currentVariant.weight}</p>
                </div>
                <div className="bg-[var(--color-fd-cream)] border-2 border-[var(--color-fd-green)]/10 rounded-[1.5rem] p-3 text-center transition-colors hover:border-[var(--color-fd-green)]/20">
                  <p className="text-[10px] text-[var(--color-fd-text-muted)] font-black uppercase tracking-wider mb-1">Shelf Life</p>
                  <p className="text-[13px] font-bold text-[var(--color-fd-green)]">{product.specs.shelfLife}</p>
                </div>
                <div className="bg-[var(--color-fd-cream)] border-2 border-[var(--color-fd-green)]/10 rounded-[1.5rem] p-3 text-center transition-colors hover:border-[var(--color-fd-green)]/20">
                  <p className="text-[10px] text-[var(--color-fd-text-muted)] font-black uppercase tracking-wider mb-1">Certified</p>
                  <p className="text-[13px] font-bold text-[var(--color-fd-green)]">FSSAI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ NUTRITIONAL INFO SECTION ═══ */}
      <motion.section
        ref={nutritionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={nutritionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-b-2 border-[var(--color-fd-green)]/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Nutrition table */}
            <div className="bg-[var(--color-fd-cream)] border-2 border-[var(--color-fd-green)]/10 rounded-[2rem] p-8 md:p-10 shadow-sm border-t-[12px] border-t-[var(--color-fd-green)]">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-fd-green)] mb-2 font-display">
                Nutritional Profile
              </h2>
              <p className="text-sm font-bold text-[var(--color-fd-text-muted)] mb-6 uppercase tracking-wider">Per 50g serving</p>

              <div className="divide-y-2 divide-[var(--color-fd-green)]/10">
                {product.nutrition.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={nutritionInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="text-sm font-bold text-[var(--color-fd-text-muted)]">{row.label}</span>
                    <span className="text-sm font-black text-[var(--color-fd-green)]">{row.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Health benefits grid */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-fd-green)] mb-8 font-display">
                Why It&apos;s Super
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={nutritionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white border-2 border-[var(--color-fd-green)]/10 rounded-[1.5rem] p-6 shadow-sm hover:border-[var(--color-fd-green)]/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[var(--color-fd-lime)] rounded-full flex items-center justify-center mb-4 border border-[var(--color-fd-green)]/20">
                      <benefit.icon className="w-6 h-6 text-[var(--color-fd-green)]" />
                    </div>
                    <h3 className="text-[15px] font-black text-[var(--color-fd-green)] mb-2">{benefit.title}</h3>
                    <p className="text-sm font-medium text-[var(--color-fd-text-muted)] leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══ RELATED PRODUCTS ═══ */}
      <motion.section
        ref={relatedRef}
        initial={{ opacity: 0, y: 40 }}
        animate={relatedInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-fd-cream)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-[var(--color-fd-orange)] mb-2">
                DISCOVER MORE
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--color-fd-green)] font-display">
                Expand Your Portfolio
              </h2>
            </div>
            <Link href="/shop" className="mt-4 md:mt-0">
              <span className="text-[var(--color-fd-green)] font-bold text-sm flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4">
                View all products <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rp, i) => (
              <motion.div
                key={rp.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/shop/${rp.slug}`}>
                  <div className="group bg-white h-[420px] rounded-[2rem] border-2 border-[var(--color-fd-green)]/10 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:border-[var(--color-fd-green)]/30 transition-all duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative flex-1 bg-[var(--color-fd-cream)] overflow-hidden flex items-center justify-center p-6 border-b-2 border-[var(--color-fd-green)]/10">
                      <Image
                        src={productImageURLs[rp.slug]}
                        alt={rp.name}
                        fill
                        unoptimized
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-6">
                      <p className="text-[10px] font-black text-[var(--color-fd-text-muted)] tracking-widest uppercase mb-1">
                        {rp.category}
                      </p>
                      <h3 className="text-xl font-black text-[var(--color-fd-green)] mb-4 leading-tight">
                        {rp.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-[var(--color-fd-green)]">{'\u20B9'}{rp.price}</span>
                        <span className="bg-[var(--color-fd-green)] text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[var(--color-fd-lime)] group-hover:text-[var(--color-fd-green)] transition-colors shadow-sm">
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
