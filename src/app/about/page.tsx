'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Leaf, Heart, Lightbulb, ShieldCheck, Recycle,
  ArrowRight, Snowflake, Sun, Package, Sparkles
} from 'lucide-react';

// ─── Animated Section Wrapper ────────────────────────────────────
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Data ────────────────────────────────────────────────────────
const values = [
  {
    icon: Recycle,
    title: 'Sustainability',
    desc: 'We source responsibly, minimize waste, and use eco-friendly packaging. Every step is designed with our planet in mind.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    desc: 'FSSAI certified, batch-tested, and quality-controlled. We never compromise on the standards our customers deserve.',
  },
  {
    icon: Heart,
    title: 'Health',
    desc: 'Zero preservatives, zero additives. Just pure fruit goodness that retains 97% of its original nutrients.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'State-of-the-art freeze-drying technology meets traditional Indian fruit wisdom for a snacking revolution.',
  },
];

const steps = [
  {
    icon: Sun,
    title: 'Fresh Harvest',
    desc: 'Fruits are picked at peak ripeness from farms across India for maximum flavor and nutrition.',
  },
  {
    icon: Snowflake,
    title: 'Flash Freeze',
    desc: 'Fruits are rapidly frozen to -40\u00B0C, locking in their cellular structure, taste, and nutrients.',
  },
  {
    icon: Sparkles,
    title: 'Vacuum Sublime',
    desc: 'Under vacuum, ice crystals transform directly into vapor, removing moisture while preserving everything else.',
  },
  {
    icon: Package,
    title: 'Sealed Fresh',
    desc: 'Sealed in moisture-proof packaging with nitrogen flushing for a shelf life of up to 24 months.',
  },
];

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    initials: 'AM',
    bio: 'A food-tech enthusiast with a vision to make healthy snacking accessible to every Indian household.',
  },
  {
    name: 'Priya Sharma',
    role: 'Head Chef & R&D',
    initials: 'PS',
    bio: 'Culinary expert who perfects every flavor profile and develops new freeze-dried creations.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Quality Lead',
    initials: 'RK',
    bio: 'Ensures every batch meets our rigorous quality standards with meticulous testing protocols.',
  },
];

// ─── Page Component ──────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#171717] leading-tight"
          >
            Preserving Nature&apos;s
            <br />
            Finest Flavors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#6B7280] max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Born from a passion for preserving nature&apos;s finest, FreezeDance
            brings you the purest form of fruit - crunchy, nutrient-rich, and
            bursting with flavor.
          </motion.p>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
                How It Started
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-6">
                A Simple Idea,
                <br />A Big Mission
              </h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  It all began with a question: why do the most delicious Indian
                  fruits have such short seasons? From the king of fruits, the
                  Alphonso mango, to the antioxidant-rich jamun - these treasures
                  deserve to be enjoyed year-round.
                </p>
                <p>
                  We discovered that freeze-drying could preserve not just the
                  taste, but up to 97% of the nutrients, natural color, and aroma
                  of fresh fruit. No sugar, no preservatives, no compromise.
                </p>
                <p>
                  Today, FreezeDance partners with organic farms across India,
                  bringing you the crunch of nature in every bite. Our mission is
                  simple: make healthy snacking irresistible.
                </p>
              </div>
            </div>
            <div className="bg-[#FAFAFA] rounded-2xl p-12 flex items-center justify-center aspect-square">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-[#171717]" />
                </div>
                <p className="text-2xl font-bold text-[#171717]">
                  Since 2024
                </p>
                <p className="text-[#6B7280] mt-2">
                  Crafting nature&apos;s crunch
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ MISSION & VISION ═══ */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAFAFA] rounded-xl p-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-[#171717]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">
                Our Mission
              </h3>
              <p className="text-[#6B7280] leading-relaxed">
                To make healthy, preservative-free snacking accessible to every
                household in India. We believe that what you eat should be as
                close to nature as possible - pure, nutritious, and delicious.
              </p>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl p-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-[#171717]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">
                Our Vision
              </h3>
              <p className="text-[#6B7280] leading-relaxed">
                To become India&apos;s most trusted freeze-dried food brand,
                pioneering innovation in food preservation while championing
                sustainability and supporting local farming communities.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ WHY FREEZE-DRYING? ═══ */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              The Science
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Why Freeze-Drying?
            </h2>
            <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto">
              Freeze-drying is the gold standard of food preservation. Here&apos;s
              how we transform fresh fruit into crunchy, shelf-stable perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-[#F3F4F6] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#FAFAFA] rounded-lg flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-[#171717]" />
                </div>
                <span className="text-xs font-medium text-[#6B7280]">Step {i + 1}</span>
                <h3 className="text-base font-bold text-[#171717] mt-1 mb-2">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ TEAM ═══ */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              The People
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Meet Our Team
            </h2>
            <p className="text-[#6B7280] mt-4 max-w-lg mx-auto">
              Passionate individuals dedicated to bringing you the best
              freeze-dried products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 border border-[#F3F4F6] text-center"
              >
                <div className="w-20 h-20 mx-auto mb-5 bg-[#FAFAFA] rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-[#171717]">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-[#171717]">{member.name}</h3>
                <p className="text-[#6B7280] font-medium text-sm mt-1">
                  {member.role}
                </p>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ VALUES ═══ */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FAFAFA] rounded-xl p-8 flex gap-5 items-start"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-[#171717]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#171717] mb-2">{value.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1c1b1b] rounded-[2rem] p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display tracking-tight">
              Ready to Taste the Difference?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Discover our range of premium freeze-dried fruits and powders.
              100% natural, packed with nutrients, and absolutely delicious.
            </p>
            <Link href="/shop">
              <button className="px-10 py-4 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white font-semibold text-base rounded-full flex items-center gap-3 mx-auto hover:shadow-lg hover:shadow-[#705d00]/25 transition-all">
                Explore Our Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
