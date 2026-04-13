'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCartStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeCart]);

  const items = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;
  const totalItems = cart?.totalItems || 0;
  const shippingCost = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - totalAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
              <div>
                <h2 className="text-lg font-semibold text-[#171717]">Shopping Cart</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
              >
                <X className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-6 py-3 border-b border-[#F3F4F6]">
                {amountForFreeShipping > 0 ? (
                  <>
                    <p className="text-xs text-[#6B7280] mb-2">
                      Add <span className="font-semibold text-[#171717]">{'\u20B9'}{amountForFreeShipping.toFixed(0)}</span> more for free shipping
                    </p>
                    <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-[#171717] rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs font-medium text-[#171717] flex items-center gap-1.5">
                    <span>&#10003;</span> You qualify for free shipping!
                  </p>
                )}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-[#FAFAFA] rounded-full flex items-center justify-center mb-5">
                    <ShoppingBag className="w-7 h-7 text-[#6B7280]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#171717] mb-1">Your cart is empty</h3>
                  <p className="text-[#6B7280] text-sm mb-8 max-w-[240px]">
                    Looks like you haven&apos;t added any items yet.
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <button className="px-8 py-3 bg-[#171717] text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#171717]/90 transition-colors">
                      Start Shopping
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, scale: 0.8 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="flex gap-4 py-4 border-b border-[#F3F4F6] last:border-0"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg bg-[#FAFAFA] overflow-hidden flex-shrink-0 border border-[#F3F4F6]">
                        {item.productImage ? (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[#6B7280]" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.productSlug}`}
                          onClick={closeCart}
                          className="font-medium text-sm text-[#171717] hover:text-[#171717]/70 transition-colors line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs text-[#6B7280] mt-0.5">{item.variantName}</p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeItem(item.id);
                                } else {
                                  updateItem(item.id, item.quantity - 1);
                                }
                              }}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-3 h-3 text-[#6B7280]" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-[#171717] border-x border-[#E5E7EB]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-3 h-3 text-[#6B7280]" />
                            </button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-sm text-[#171717]">
                              {'\u20B9'}{item.subtotal.toFixed(0)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={isLoading}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#F3F4F6] px-6 py-5">
                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Subtotal</span>
                    <span className="font-medium text-[#171717]">{'\u20B9'}{totalAmount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Shipping</span>
                    <span className="font-medium text-[#171717]">
                      {shippingCost === 0 ? 'FREE' : `\u20B9${shippingCost}`}
                    </span>
                  </div>
                  <div className="h-px bg-[#F3F4F6]" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#171717]">Total</span>
                    <span className="font-bold text-lg text-[#171717]">
                      {'\u20B9'}{(totalAmount + shippingCost).toFixed(0)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout" onClick={closeCart}>
                  <button className="w-full py-3.5 bg-[#171717] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#171717]/90 transition-colors">
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full mt-2 py-2 text-sm text-[#6B7280] hover:text-[#171717] transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
