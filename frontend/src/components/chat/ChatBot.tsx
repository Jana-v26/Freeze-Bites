'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

// ─── Simulated responses ─────────────────────────────────────────
const quickReplies = [
  { label: 'Track Order', value: 'Track Order' },
  { label: 'Product Info', value: 'Product Info' },
  { label: 'Contact Support', value: 'Contact Support' },
  { label: 'Return Policy', value: 'Return Policy' },
];

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('track') && lower.includes('order')) {
    return "Please provide your order number and I'll look it up for you!";
  }
  if (lower.includes('product') || lower.includes('info') || lower.includes('menu') || lower.includes('what do you')) {
    return 'We offer premium freeze-dried fruit cubes (Mango, Pineapple, Jamun, Banana, Jackfruit) and powders (Jamun, Mango, Pineapple, Moringa). All 100% natural with no preservatives!';
  }
  if (lower.includes('contact') || lower.includes('support') || lower.includes('reach') || lower.includes('call')) {
    return 'You can reach us at support@freezedelights.in or call +91-XXXXX-XXXXX. We\'re available Mon-Sat, 9AM-6PM IST.';
  }
  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    return 'We offer easy returns within 7 days of delivery. Items must be unopened and in original packaging.';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good')) {
    return 'Hello! Welcome to FreezeDelights. How can I assist you today?';
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    return 'Our fruit cubes range from \u20B9199 to \u20B9319 (50g packs) and powders from \u20B9299 to \u20B9399 (100g packs). Check out our shop for combo deals!';
  }
  if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('deliver')) {
    return 'We deliver pan-India! Free shipping on orders above \u20B9999. Standard delivery takes 3-5 business days.';
  }

  return 'Thanks for your message! Our team will get back to you shortly. Is there anything else I can help with?';
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ─── Typing Indicator ────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-7 h-7 rounded-full bg-[#FAFAFA] flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-[#6B7280]" />
      </div>
      <div className="bg-[#FAFAFA] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#6B7280] rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── ChatBot Component ───────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      text: "Hi! Welcome to FreezeDelights. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 1000 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#705d00] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#544600] transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl bg-white border border-[#E5E7EB] shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#171717] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">FreezeDelights Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/60 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-white">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-[#FAFAFA] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                        <Bot className="w-3.5 h-3.5 text-[#6B7280]" />
                      </div>
                    )}
                    <div className={`max-w-[75%] ${msg.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#171717] text-white rounded-2xl rounded-br-md'
                            : 'bg-[#FAFAFA] text-[#171717] rounded-2xl rounded-bl-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p
                        className={`text-[10px] text-[#9CA3AF] mt-1 ${
                          msg.sender === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0 bg-white">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  onClick={() => sendMessage(qr.value)}
                  className="px-3 py-1.5 text-xs font-medium text-[#171717] border border-[#E5E7EB] rounded-lg hover:bg-[#FAFAFA] transition-colors"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="px-4 pb-4 pt-2 flex items-center gap-2 flex-shrink-0 bg-white border-t border-[#F3F4F6]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#171717] placeholder:text-[#9CA3AF] outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-[#171717] text-white rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#171717]/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
