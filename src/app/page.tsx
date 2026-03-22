'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck,
  Globe,
  ClipboardCheck,
  Ship,
  Package,
  Play,
  ArrowRight,
  Quote,
} from 'lucide-react';

// ── Image URLs (Google CDN) ──
const images = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSRXqa_3Y9FIJjOEW5tSTx-N_75gq9r1nVf_rjT_Zkxp1FpFlfp417vnwDIhessYzQnj693PIYE4467J-OuGfDc3HUKlYg91dbPlIHHnOc4ds89uI14qNyqNQ2AeFNcjteuPjQGRA5091SxOdD3-qLwCDce_CmYPYIG7BAk9b-K26z43SHnTu2s7DoAqEmShsqN-eUPqyPVh1PnA2DAgfe_e-eupiP_KLYcUlqQLJ_gLW7wBcrZwrP_wGRW2Kx-ZAJPNYbTM7zgWvp',
  mango: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6ptDAgiZ2TncDFfKB3taATRb6bWEo8ot09-GA3n6ogLLy2awGBUv6leLjKMHM2vRz3jv5h_wBNzlGRginrg90tFwTrdZ4vVhof6e9byQYoBVBTuXfSQQH6eeUDUQ6B_Kw2VF4RMlevfdRDGKoOwrfOR2WhV4M0_1NaRMsxHBOgrLMjjYRug_QDYavSkiEdE8NwuFBUjiPVbs4WP9Gsam1pwKspt4uGMQwgFfZadl12RdD0cPJmt4Pk4lUgFR9u4sxlf1U7b-v7eMP',
  banana: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLCbvewiOLXx3Uirr9T644W9J9dxRkNNNWJbUmLsIubZnQ1nNmdPv9UxHkSbQRmHHXqGolxCeKp6NK89StClWfzikN_rx2U7WFrB12R8tFtAYMnv68bXa1mtxnt9edU4nklZmf-GSlonZwu6h0gaTuRq5Zfq6NqdiWu_3BBtQTfVcie6znhgrYBAWrGZgys4vm2nnAr735sgXu7xdXmN81q49Q63kEXQel_Zu63QoVEf6WfyQgMq6OO5A_yh-BsDRrZYP8-a7GLBJa',
  pineapple: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2JS6aMBndIx4DlVEJW0ANAX_XnLIK_rkhnOFjTOzgE9hZjeKI9E6saMQDBaCWTuRTPgm51QOA8mnL170vAZFMO8-GOrNiGtBWLowLHQBOsG1CWUc9_s9tvqo4K-afGrUlpJ-0VWv1UGcC0-LDsm0lvUEK4KQTtRDmGFGcWf_FmdfHBkHqUN48NpiuNsXdNtTO7EDqVtgWTRh0NB_IvwQ-D_UYB1cswqIVMTOX0BSZs64bY3VdJwrHkIxcwAND4M-pV7nob-k9xf3l',
  jackfruit: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd2N03cVfTXlcXqr0JmY-7d7bw5jmBa8QQ2mh05OnzUmuVdD6hS1BXICKHJjZzIOn-6ri-z57Kh6o4I_t8D2ImSClZLk9iAuje3IsvLEfd3ZzbgYR0epblA2Y07omTH55rB6d84p1PsTydtdbBe1OI8HoF1wgIcRRhTtGzfS2ucJzbxboZBv0hJDSEW69-OFvfrhgS1Kx4Z-729Ibw4-0zXJZoe99R7_2qxveEJIiixc3K4TFHIVlqI4pJ7fdGPXk6HQGp-uGQkUmM',
  moringa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDK3gCqItkeCFUYonSx_Q4I6jTu6e1UdK3N4uDj4_zSzVG9qtAg-m_l9MZTgpCUf7ejOqT7Axs6UwwDXfy2qWZV01UljUI6yFWNiXJKrJEpeqfqOldv7Y01-cWXIfdjn9orEacN_tQcRLskQg0vKSfBDaNta_oIChiH-esQ1zHdS8vuI7RMk0VgsNO_xNf3-XBmVmtP2B5pE8lymWPGMp5n6cwg1BeWvV7ZBgnwe-VnvxC2IVZQaFj_bziV2LExv1A-CfoptTcCZwx',
  jamun_powder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1D9Ulrmt6M5GvNN_fko0dUtrPS-AroXAlpOthD1kgOzJL4ULEL4QsqdLaEkH4OAojxi_RmH0XGb_7mZnt8GbPyyNDB91DDmF-4ijIfIbCXsnfDt96z_r2Hx78fl6CRBgL9zNfJQIPCy3aR4Jz-lUncyATk_Kbi7CZ3DsCSEV7tux5TujTSFWAjuAl-1x4YTgJcxvMedSJSYEco1Tbw6ATX7UKJ0oe1ecnXajerhcW3TOP6kFXlfSxFiZ0Egd2onHkF6CizZdFB35',
  mango_powder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmnILGSlVSSNZzJLrKf7WAygot5YtJJFwKhQ7Sa2Net_U8ICKmtVUpWHkmQA3M5oKdchZrV_GcmJp-F1ipnoksXyNsyhnEvy86vFg5VnAOi1Z46Tk55EVeAhgC9Fz2WYIJ1K37Gy17RXpstKLqr-hugRw0YJD3WaghGcogZZ6YfjAZreUqVkeGVjAFhJNMag-GHTZHOATC8HNYGH-nkIpTbdOZ3LeqsmW5NLHdJ9qaSF5cgyZHbdFoVK7Mn7olBKF6oosY6lxVvSze',
  pineapple_powder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhT9tG-b1W38WTIRiluLTD6yC_bWeTfMEmt5f1smzpWGpKda3fXbiikAS-5qS8HJwloXvJWJ8nIkgqlEeP07kwmIXEC-3svJgOYQU8VkIp_K9_tzUs5NvM6EVq59JewZhUREHrQ6cU3deP7jSOsk9tAt5STzYi85buFRkNRPa6Z7TGBSAjFTSes0rS4ncJeo8c_LkwnZZ5X8HPPJW7VglCWtqvweqQjXIN-2WBXZH3jx6R_3iyMA7kO59Hz4ODaXpsCu1mz8-mQdi',
};

// ── Product data ──
const fruits = [
  {
    name: 'Alphonso Mango',
    slug: 'mango-cubes',
    description: 'Premium Ratnagiri Alphonso mangoes, freeze-dried to preserve their iconic sweetness and aroma.',
    category: 'Freeze-Dried Fruit',
    image: images.mango,
  },
  {
    name: 'Banana',
    slug: 'banana-cubes',
    description: 'Ripe Robusta bananas from South India, crispy and naturally sweet with no additives.',
    category: 'Freeze-Dried Fruit',
    image: images.banana,
  },
  {
    name: 'Pineapple',
    slug: 'pineapple-cubes',
    description: 'Tangy-sweet Mauritius pineapples, retaining their tropical zing in every crunchy bite.',
    category: 'Freeze-Dried Fruit',
    image: images.pineapple,
  },
  {
    name: 'Jackfruit',
    slug: 'jackfruit-cubes',
    description: 'Kerala jackfruit pods, naturally fragrant and fiber-rich, perfectly preserved.',
    category: 'Freeze-Dried Fruit',
    image: images.jackfruit,
  },
];

const powders = [
  {
    name: 'Moringa Powder',
    slug: 'moringa-powder',
    description: 'Nutrient-dense drumstick leaves from Tamil Nadu, packed with iron and antioxidants.',
    category: 'Nutrient Powder',
    image: images.moringa,
  },
  {
    name: 'Jamun Powder',
    slug: 'jamun-powder',
    description: 'Indian blackberry fruit powder, traditionally valued for blood sugar support.',
    category: 'Nutrient Powder',
    image: images.jamun_powder,
  },
  {
    name: 'Mango Powder',
    slug: 'mango-powder',
    description: 'Amchur-style mango powder made from premium Alphonso, perfect for smoothies and cooking.',
    category: 'Nutrient Powder',
    image: images.mango_powder,
  },
  {
    name: 'Pineapple Powder',
    slug: 'pineapple-powder',
    description: 'Vitamin C-rich pineapple powder, great for juices, desserts, and daily nutrition.',
    category: 'Nutrient Powder',
    image: images.pineapple_powder,
  },
];

const exportServices = [
  {
    icon: Globe,
    title: 'Global Logistics',
    description: 'End-to-end international shipping with temperature-controlled containers to over 40 countries.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality Control',
    description: 'FSSAI, ISO 22000, and HACCP certified processes ensuring consistent quality in every batch.',
  },
  {
    icon: Ship,
    title: 'Bulk Shipping',
    description: 'Flexible MOQs with competitive pricing for wholesale, white-label, and private-label orders.',
  },
  {
    icon: Package,
    title: 'Custom Packaging',
    description: 'Bespoke packaging design and branding services tailored for your target market.',
  },
];

const testimonials = [
  {
    quote: 'FreezeDance has been our go-to supplier for over two years. Their Alphonso mango cubes are consistently top-quality and our customers love them.',
    name: 'Sarah Mitchell',
    role: 'Procurement Head, NatureBite UK',
    avatar: 'SM',
  },
  {
    quote: 'The moringa powder is exceptional. We tested multiple suppliers across Asia and FreezeDance stood out for purity, packaging, and reliable delivery.',
    name: 'Takeshi Yamamoto',
    role: 'Product Manager, GreenLife Japan',
    avatar: 'TY',
  },
  {
    quote: 'From sampling to bulk shipment, the entire process was seamless. Their team understands export compliance and documentation thoroughly.',
    name: 'Priya Deshmukh',
    role: 'Director, OrganicRoots Dubai',
    avatar: 'PD',
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

// ── Product card ──
function ProductCard({
  product,
  index,
}: {
  product: (typeof fruits)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="rounded-[2rem] bg-[#f6f3f2] p-8">
          {/* Image container */}
          <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              unoptimized
              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          </div>
          {/* Info */}
          <p className="text-xs uppercase tracking-widest text-[#705d00] font-semibold mb-2">
            {product.category}
          </p>
          <h3 className="text-xl font-bold text-[#1c1b1b] mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-[#4d4732] leading-relaxed">
            {product.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main page ──
export default function HomePage() {
  return (
    <div className="bg-[#fcf9f8]">
      {/* ═══════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xs uppercase tracking-widest text-[#705d00] font-bold mb-6"
              >
                100% Natural
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#1c1b1b] leading-[1.05]"
              >
                Nature&apos;s Freshness,{' '}
                <span className="text-[#705d00] italic">Freeze-Dried</span> for
                the World
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-[#4d4732] mt-6 max-w-lg leading-relaxed"
              >
                We bridge the gap between tropical orchards and international
                markets with premium freeze-dried fruits and nutrient powders —
                preserving 97% of nature&apos;s goodness.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/shop"
                  className="btn-primary"
                >
                  Explore Collections
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="btn-secondary">
                  <Play className="w-4 h-4" />
                  Watch Process
                </button>
              </motion.div>
            </div>

            {/* Right column — image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="rounded-[2.5rem] overflow-hidden">
                <Image
                  src={images.hero}
                  alt="FreezeDance product packaging"
                  width={640}
                  height={640}
                  unoptimized
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#006e1c]" />
                </div>
                <div>
                  <p className="font-bold text-[#1c1b1b] text-sm">
                    Purity Check
                  </p>
                  <p className="text-xs text-[#4d4732]">
                    100% Organic additive-free process
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FREEZE-DRIED FRUITS SECTION
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1c1b1b] tracking-tight">
                Freeze-Dried Fruits
              </h2>
              <p className="text-[#4d4732] mt-2 max-w-md">
                Our signature collection of crispy, crunchy fruit cubes made from
                handpicked Indian fruits.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-[#705d00] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {fruits.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════
          NUTRIENT POWDERS SECTION
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 bg-[#f0eded]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1c1b1b] tracking-tight">
                Nutrient Powders
              </h2>
              <p className="text-[#4d4732] mt-2 max-w-md">
                Superfoods ground to perfection — add to smoothies, recipes, or
                enjoy as daily supplements.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-[#705d00] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {powders.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════
          EXPORT SERVICES SECTION
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT — Image collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwtUrjiqorB4zvGXqaFjkELpsgS0wn94pn8sMp3_3fJbvol667tRq7T_2QzkiARPS1kY92U6IGbIzR3oIXIPn3rLcuj6IH2lslae4zi1JWHac7gsDe2YhrUkoGCtP5HFPS2_gsPmLMjBf6v5DiYN_g2qjPvVac0NzmcnJCd1LLvr_gPKjOK-A77RsmioueJomAJHn8-heSEqn13h1nRl94rSqBEqVV5paP182mtKxtfvOU3axtjDnShFKCKCrbRxb76F9p2JEMGnAf"
                alt="Logistics"
                className="w-full h-64 object-cover rounded-3xl"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC340Bmsuq3oc1tESbi4oOlA4KVCtkM1IfE6s-nMzACiFZnUn2ohw9yueshqtojgXOPQXglKOLgQsOG8u46D1fhZB5dOHya7PMgorhBpwQ_gaGHE8boWOpwBXBKy526myhl82HwPDhZf5gJVggMDTwTWQ7T1WycbTLh4gBhODDVe3nHZCqxmCOA7KM2zdho942LTVp0OnOMC8fw-KFXVmq9lPweCWeHzjCra82nvL0N7KoPbJlxkk_iOWklyGHv3Vdrta48IwbaK0TV"
                alt="Quality Control"
                className="w-full h-80 object-cover rounded-3xl"
              />
            </div>
            <div className="space-y-4 pt-12">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7JLltC_Xco7pBnrtbV9K6SIlb1hEwpDuEx0ovRyMOyz3a5I-MhALrLvfl7aSGp5Mk1ryZOFs0PADA5ZjUc6t6d3hafjiuSooYWyMKcCe4qZa8mQX7WejIoteezLfsshvsC3l4jNwtR-dzXd8lq1xe5GAehcZVLG0m3TcbTZaH6linMQn_8Nvgu5h920VPrAhfTBJFVmXfPgtbu9YfF4SJA7eRpEKsU02LX_BwKP__7mKVASm0flOVY_IuWWb1YcEQrFgJQJdg6LYx"
                alt="Shipping"
                className="w-full h-80 object-cover rounded-3xl"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_8Gu7e4unSgNFdPOTjl_oI7E43uq2qPnT3uEmBFC-dd8Wvl4c1mj0I-oQSnkQs0D1vHQ-SZGfcENJD91Q2CQQ_6S-fdsTGU9FjpIX5Z3pfKI745K0LJsPQwsb222lWq5KXPudGpAdQM0_DzQYb9r5EXTIXeySr0sx5ltU7JQYGkLCFOFOrR2-TsSuxk9c7RyCQYK-32WWQNFNDMVC-EMFV6lG2aGWmXViRarXevQAkHAlpYImpAhgn9_slUmy47n5FwUWrir3dfm"
                alt="Packaging"
                className="w-full h-64 object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* RIGHT — Text content */}
          <div>
            <span className="text-[#705d00] font-bold tracking-widest text-xs uppercase mb-4 block">
              End-to-End Solutions
            </span>
            <h2 className="text-5xl font-display font-bold text-[#1c1b1b] tracking-tight mb-8">
              Export Services
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#705d00]/20 flex items-center justify-center text-[#705d00] group-hover:bg-[#705d00] group-hover:text-white transition-all duration-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2 font-display">Global Distribution</h5>
                  <p className="text-[#4d4732]">
                    Seamless multi-modal shipping with temperature-controlled tracking across 40+ countries worldwide.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#705d00]/20 flex items-center justify-center text-[#705d00] group-hover:bg-[#705d00] group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2 font-display">Quality Control &amp; QA</h5>
                  <p className="text-[#4d4732]">
                    FSSAI, ISO 22000, and HACCP certified processes ensuring consistent quality in every batch.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#705d00]/20 flex items-center justify-center text-[#705d00] group-hover:bg-[#705d00] group-hover:text-white transition-all duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2 font-display">Custom Packaging</h5>
                  <p className="text-[#4d4732]">
                    Bespoke packaging design and branding services tailored for your target market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════
          TESTIMONIALS SECTION
         ═══════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 bg-[#f6f3f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#705d00] font-bold tracking-widest text-xs uppercase mb-4 block">
              Trusted Partnerships
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1c1b1b] tracking-tight">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl border border-[#f0eded] transition-shadow duration-300${i === 1 ? ' md:mt-12' : ''}`}
              >
                <Quote className="w-8 h-8 text-[#705d00]/20 group-hover:text-[#705d00] transition-colors duration-300 mb-4" />
                <p className="text-[#1c1b1b] leading-relaxed text-sm mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#705d00] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[#1c1b1b] font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-[#705d00] text-xs uppercase tracking-wide font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
