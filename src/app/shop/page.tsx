'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ─── Product image URLs ────────────────────────────────────────
const productImageURLs: Record<string, string> = {
  'mango-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6ptDAgiZ2TncDFfKB3taATRb6bWEo8ot09-GA3n6ogLLy2awGBUv6leLjKMHM2vRz3jv5h_wBNzlGRginrg90tFwTrdZ4vVhof6e9byQYoBVBTuXfSQQH6eeUDUQ6B_Kw2VF4RMlevfdRDGKoOwrfOR2WhV4M0_1NaRMsxHBOgrLMjjYRug_QDYavSkiEdE8NwuFBUjiPVbs4WP9Gsam1pwKspt4uGMQwgFfZadl12RdD0cPJmt4Pk4lUgFR9u4sxlf1U7b-v7eMP',
  'pineapple-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2JS6aMBndIx4DlVEJW0ANAX_XnLIK_rkhnOFjTOzgE9hZjeKI9E6saMQDBaCWTuRTPgm51QOA8mnL170vAZFMO8-GOrNiGtBWLowLHQBOsG1CWUc9_s9tvqo4K-afGrUlpJ-0VWv1UGcC0-LDsm0lvUEK4KQTtRDmGFGcWf_FmdfHBkHqUN48NpiuNsXdNtTO7EDqVtgWTRh0NB_IvwQ-D_UYB1cswqIVMTOX0BSZs64bY3VdJwrHkIxcwAND4M-pV7nob-k9xf3l',
  'jamun-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1D9Ulrmt6M5GvNN_fko0dUtrPS-AroXAlpOthD1kgOzJL4ULEL4QsqdLaEkH4OAojxi_RmH0XGb_7mZnt8GbPyyNDB91DDmF-4ijIfIbCXsnfDt96z_r2Hx78fl6CRBgL9zNfJQIPCy3aR4Jz-lUncyATk_Kbi7CZ3DsCSEV7tux5TujTSFWAjuAl-1x4YTgJcxvMedSJSYEco1Tbw6ATX7UKJ0oe1ecnXajerhcW3TOP6kFXlfSxFiZ0Egd2onHkF6CizZdFB35',
  'banana-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLCbvewiOLXx3Uirr9T644W9J9dxRkNNNWJbUmLsIubZnQ1nNmdPv9UxHkSbQRmHHXqGolxCeKp6NK89StClWfzikN_rx2U7WFrB12R8tFtAYMnv68bXa1mtxnt9edU4nklZmf-GSlonZwu6h0gaTuRq5Zfq6NqdiWu_3BBtQTfVcie6znhgrYBAWrGZgys4vm2nnAr735sgXu7xdXmN81q49Q63kEXQel_Zu63QoVEf6WfyQgMq6OO5A_yh-BsDRrZYP8-a7GLBJa',
  'jackfruit-cubes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd2N03cVfTXlcXqr0JmY-7d7bw5jmBa8QQ2mh05OnzUmuVdD6hS1BXICKHJjZzIOn-6ri-z57Kh6o4I_t8D2ImSClZLk9iAuje3IsvLEfd3ZzbgYR0epblA2Y07omTH55rB6d84p1PsTydtdbBe1OI8HoF1wgIcRRhTtGzfS2ucJzbxboZBv0hJDSEW69-OFvfrhgS1Kx4Z-729Ibw4-0zXJZoe99R7_2qxveEJIiixc3K4TFHIVlqI4pJ7fdGPXk6HQGp-uGQkUmM',
  'jamun-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1D9Ulrmt6M5GvNN_fko0dUtrPS-AroXAlpOthD1kgOzJL4ULEL4QsqdLaEkH4OAojxi_RmH0XGb_7mZnt8GbPyyNDB91DDmF-4ijIfIbCXsnfDt96z_r2Hx78fl6CRBgL9zNfJQIPCy3aR4Jz-lUncyATk_Kbi7CZ3DsCSEV7tux5TujTSFWAjuAl-1x4YTgJcxvMedSJSYEco1Tbw6ATX7UKJ0oe1ecnXajerhcW3TOP6kFXlfSxFiZ0Egd2onHkF6CizZdFB35',
  'mango-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmnILGSlVSSNZzJLrKf7WAygot5YtJJFwKhQ7Sa2Net_U8ICKmtVUpWHkmQA3M5oKdchZrV_GcmJp-F1ipnoksXyNsyhnEvy86vFg5VnAOi1Z46Tk55EVeAhgC9Fz2WYIJ1K37Gy17RXpstKLqr-hugRw0YJD3WaghGcogZZ6YfjAZreUqVkeGVjAFhJNMag-GHTZHOATC8HNYGH-nkIpTbdOZ3LeqsmW5NLHdJ9qaSF5cgyZHbdFoVK7Mn7olBKF6oosY6lxVvSze',
  'pineapple-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhT9tG-b1W38WTIRiluLTD6yC_bWeTfMEmt5f1smzpWGpKda3fXbiikAS-5qS8HJwloXvJWJ8nIkgqlEeP07kwmIXEC-3svJgOYQU8VkIp_K9_tzUs5NvM6EVq59JewZhUREHrQ6cU3deP7jSOsk9tAt5STzYi85buFRkNRPa6Z7TGBSAjFTSes0rS4ncJeo8c_LkwnZZ5X8HPPJW7VglCWtqvweqQjXIN-2WBXZH3jx6R_3iyMA7kO59Hz4ODaXpsCu1mz8-mQdi',
  'moringa-powder': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDK3gCqItkeCFUYonSx_Q4I6jTu6e1UdK3N4uDj4_zSzVG9qtAg-m_l9MZTgpCUf7ejOqT7Axs6UwwDXfy2qWZV01UljUI6yFWNiXJKrJEpeqfqOldv7Y01-cWXIfdjn9orEacN_tQcRLskQg0vKSfBDaNta_oIChiH-esQ1zHdS8vuI7RMk0VgsNO_xNf3-XBmVmtP2B5pE8lymWPGMp5n6cwg1BeWvV7ZBgnwe-VnvxC2IVZQaFj_bziV2LExv1A-CfoptTcCZwx',
};

// ─── Static product data ────────────────────────────────────────
const allProducts = [
  { id: 1, name: 'Mango Cubes', slug: 'mango-cubes', price: 249, category: 'Freeze Dried Fruit', bgTint: 'bg-[#fffbeb]', nutritional: 'Rich in Vitamin A, Beta-carotene, Natural Energy' },
  { id: 2, name: 'Pineapple Cubes', slug: 'pineapple-cubes', price: 279, category: 'Freeze Dried Fruit', bgTint: 'bg-[#fffbeb]', nutritional: 'Bromelain-rich, Vitamin C, Anti-inflammatory' },
  { id: 3, name: 'Jamun Cubes', slug: 'jamun-cubes', price: 299, category: 'Freeze Dried Fruit', bgTint: 'bg-[#f5f0ff]', nutritional: 'Anthocyanin-rich, Blood Sugar Support, Iron' },
  { id: 4, name: 'Banana Cubes', slug: 'banana-cubes', price: 199, category: 'Freeze Dried Fruit', bgTint: 'bg-[#fffbeb]', nutritional: 'Potassium-rich, Vitamin B6, Natural Fiber' },
  { id: 5, name: 'Jackfruit Cubes', slug: 'jackfruit-cubes', price: 319, category: 'Freeze Dried Fruit', bgTint: 'bg-[#fef9ee]', nutritional: 'Vitamin C, Dietary Fiber, Carotenoids' },
  { id: 6, name: 'Jamun Powder', slug: 'jamun-powder', price: 349, category: 'Fruit Powder', bgTint: 'bg-[#f5f0ff]', nutritional: 'Blood Sugar Support, Antioxidants, Iron-rich' },
  { id: 7, name: 'Mango Powder', slug: 'mango-powder', price: 299, category: 'Fruit Powder', bgTint: 'bg-[#fffbeb]', nutritional: 'Vitamin A, Immune Booster, Folate-rich' },
  { id: 8, name: 'Pineapple Powder', slug: 'pineapple-powder', price: 299, category: 'Fruit Powder', bgTint: 'bg-[#fffbeb]', nutritional: 'Digestive Enzymes, Anti-inflammatory, Vitamin C' },
  { id: 9, name: 'Moringa Powder', slug: 'moringa-powder', price: 399, category: 'Superfood Powder', bgTint: 'bg-[#f0f9f0]', nutritional: '7x Vitamin C of Oranges, Complete Protein, Iron & Calcium' },
];

// ─── Product Card ───────────────────────────────────────────────
function ProductCard({ product, index }: { product: typeof allProducts[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Staggered layout: every 2nd card (index 1, 4, 7) gets top margin
  const isStaggered = index % 3 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={isStaggered ? 'mt-12 md:mt-24' : ''}
    >
      <Link href={`/shop/${product.slug}`}>
        <div
          className="group relative h-[500px] rounded-xl bg-[#f6f3f2] overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top 2/3: Image area with colored tint */}
          <div className={`relative h-[65%] ${product.bgTint} flex items-center justify-center overflow-hidden`}>
            <Image
              src={productImageURLs[product.slug]}
              alt={product.name}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Bottom 1/3: Product info */}
          <div className="relative h-[35%] p-5 flex flex-col justify-center">
            <p className="text-xs font-medium text-[#4d4732] tracking-wide uppercase mb-1">
              {product.category}
            </p>
            <h3 className="text-2xl font-bold text-[#1c1b1b]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {product.name}
            </h3>
            <p className="text-xl font-bold text-[#705d00] mt-2">
              {'\u20B9'}{product.price}
            </p>
          </div>

          {/* Hover reveal panel */}
          <motion.div
            initial={false}
            animate={{ y: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-[#ffd700] p-6 flex flex-col justify-between"
            style={{ height: '45%' }}
          >
            <div>
              <p className="text-sm font-semibold text-[#1c1b1b] mb-2">Nutritional Highlights</p>
              <p className="text-sm text-[#4d4732] leading-relaxed">{product.nutritional}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-[#1c1b1b]">{'\u20B9'}{product.price}</span>
              <span className="inline-flex items-center gap-2 bg-[#1c1b1b] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors">
                Quick Order
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Shop Page ─────────────────────────────────────────────
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'Freeze Dried Fruit', name: 'Fruit Cubes' },
    { id: 'Fruit Powder', name: 'Fruit Powders' },
    { id: 'Superfood Powder', name: 'Superfoods' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fcf9f8]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ═══ HEADER SECTION ═══ */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest uppercase text-[#705d00] mb-4"
          >
            GLOBAL PREMIUM EXPORT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#1c1b1b] leading-[0.95]"
                     >
            Nature&apos;s Essence,
            <br />
            <span className="text-[#705d00]">Preserved.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-[#4d4732] mt-5 max-w-xl leading-relaxed"
          >
            A curated collection of premium freeze-dried fruits and superfood powders,
            crafted to preserve the purest flavors and peak nutrition from India&apos;s finest harvests.
          </motion.p>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#705d00] text-white'
                    : 'bg-[#f6f3f2] text-[#4d4732] hover:bg-[#eae6e4]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCT GRID ═══ */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <h3 className="text-xl font-semibold text-[#1c1b1b] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                No products found
              </h3>
              <p className="text-[#4d4732] text-sm mb-6">
                Try selecting a different category.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="btn-primary"
              >
                View All Products
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══ FUTURE HARVEST SECTION ═══ */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#f6f3f2] rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          >
            <div className="max-w-lg">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#705d00] mb-3">
                FUTURE HARVEST
              </p>
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1c1b1b] mb-4"
                             >
                Expanding Our Collection
              </h2>
              <p className="text-[#4d4732] leading-relaxed">
                We are constantly sourcing the finest seasonal fruits and superfoods from
                across India. New products are added every quarter to bring you the
                most diverse selection of freeze-dried nutrition. Be the first to know
                when new products launch.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="inline-flex items-center gap-2 btn-primary !px-8 !py-4">
                Request Notification
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
