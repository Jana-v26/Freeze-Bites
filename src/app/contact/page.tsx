'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, ChevronDown, Clock,
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
const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'support@freezedance.com',
    desc: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91-XXXXX-XXXXX',
    desc: 'Mon-Sat, 9AM-6PM IST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Hyderabad, Telangana',
    desc: 'India - 500001',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Sat: 9AM - 6PM',
    desc: 'Sunday: Closed',
  },
];

const faqs = [
  {
    q: 'What are freeze-dried fruits?',
    a: 'Freeze-dried fruits are real fruits that have been preserved using a special process called lyophilization. The fruit is frozen and then placed in a vacuum chamber where the ice is removed as vapor, leaving behind a crunchy, lightweight snack that retains 97% of its original nutrients.',
  },
  {
    q: 'How long do freeze-dried products last?',
    a: 'Our freeze-dried products have a shelf life of up to 24 months when stored in a cool, dry place in their original sealed packaging. Once opened, we recommend consuming within 2-3 weeks and keeping the pack sealed tightly.',
  },
  {
    q: 'Are your products suitable for children?',
    a: 'Absolutely! Our products are 100% natural with no added sugar, preservatives, or artificial flavors. They make an excellent healthy snack for children of all ages. However, as with any food, supervise young children while eating.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Currently, we ship across India with free delivery on orders above \u20B9999. International shipping is coming soon! Sign up for our newsletter to be the first to know when we launch international delivery.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer easy returns within 7 days of delivery. Items must be unopened and in their original packaging. For damaged or defective products, we provide free replacements. Contact our support team to initiate a return.',
  },
  {
    q: 'Are your products organic?',
    a: 'We source from organic and sustainable farms wherever possible. All our products are FSSAI certified and free from preservatives, additives, and artificial colors. We prioritize quality and purity in every batch.',
  },
];

// ─── FAQ Accordion Item ──────────────────────────────────────────
function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-[#F3F4F6]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-[#171717] pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#6B7280]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="pb-5 text-[#6B7280] text-sm leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page Component ──────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white">
      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#171717] leading-tight"
          >
            We&apos;d Love to
            <br />
            Hear From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#6B7280] max-w-xl mx-auto mt-6"
          >
            Have a question, feedback, or just want to say hello? Drop us a
            message and we&apos;ll get back to you soon.
          </motion.p>
        </div>
      </section>

      {/* ═══ CONTACT INFO CARDS ═══ */}
      <AnimatedSection className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#FAFAFA] rounded-xl p-6 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                <info.icon className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="font-semibold text-sm text-[#171717] mb-1">{info.title}</h3>
              <p className="text-[#171717] font-medium text-sm">{info.value}</p>
              <p className="text-[#9CA3AF] text-xs mt-1">{info.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══ CONTACT FORM + MAP ═══ */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              Send a Message
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-8">
              Drop Us a Line
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#171717] placeholder:text-[#9CA3AF] outline-none focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#171717] placeholder:text-[#9CA3AF] outline-none focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#171717] outline-none focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] transition-all bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Related</option>
                  <option value="product">Product Question</option>
                  <option value="partnership">Business / Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#171717] placeholder:text-[#9CA3AF] outline-none focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full !py-3.5 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-[#FAFAFA] text-[#171717] rounded-lg text-sm font-medium text-center border border-[#F3F4F6]"
                  >
                    Thank you! Your message has been sent. We&apos;ll get back
                    to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              Find Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-8">
              Our Location
            </h2>

            <div className="flex-1 min-h-[350px] bg-[#FAFAFA] rounded-xl flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-[#171717]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">FreezeDance HQ</h3>
              <p className="text-[#6B7280] text-sm text-center leading-relaxed max-w-xs">
                Hyderabad, Telangana, India - 500001
              </p>
              <p className="text-[#9CA3AF] text-xs mt-4">
                Interactive map coming soon
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ FAQ SECTION ═══ */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-[#6B7280] tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Common Questions
            </h2>
            <p className="text-[#6B7280] mt-4">
              Find quick answers to the most frequently asked questions.
            </p>
          </div>

          <div className="border-t border-[#F3F4F6]">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className="text-[#6B7280] text-sm">
              Still have questions?{' '}
              <a
                href="mailto:support@freezedance.com"
                className="text-[#171717] font-semibold hover:underline"
              >
                Email our support team
              </a>
            </p>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
