'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, CreditCard, Tag, ChevronDown, Plus, Check,
  ShoppingBag, ArrowLeft, Truck, ShieldCheck,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { orderAPI, paymentAPI, userAPI } from '@/lib/api';
import { Address } from '@/types';
import toast from 'react-hot-toast';

const FREE_SHIPPING_THRESHOLD = 999;

// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// ── Load Razorpay script ────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ── Confetti particles ──────────────────────────────────────────
function SuccessConfetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ['#171717', '#6B7280', '#E5E7EB', '#FAFAFA', '#D1D5DB'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: 0, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
          style={{ backgroundColor: p.color, width: p.size, height: p.size }}
          className="absolute rounded-sm"
        />
      ))}
    </div>
  );
}

// ── Address Form ────────────────────────────────────────────────
interface AddressFormData {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyAddress: AddressFormData = {
  fullName: '', phone: '', addressLine1: '', addressLine2: '',
  city: '', state: '', pincode: '',
};

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh',
];

// ── Main Checkout Component ─────────────────────────────────────
export default function CheckoutPage() {
  const { cart, fetchCart, clearCart } = useCartStore();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressFormData>(emptyAddress);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [orderNotes, setOrderNotes] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const items = cart?.items || [];
  const subtotal = cart?.totalAmount || 0;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const total = subtotal + shippingCost - couponDiscount;

  const loadAddresses = useCallback(async () => {
    try {
      setLoadingAddresses(true);
      const { data } = await userAPI.getAddresses();
      const addrs = data.data || [];
      setAddresses(addrs);
      const defaultAddr = addrs.find((a: Address) => a.isDefault);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      else if (addrs.length > 0) setSelectedAddressId(addrs[0].id);
    } catch {
      // User might not be logged in, show address form
      setShowAddressForm(true);
    } finally {
      setLoadingAddresses(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    loadAddresses();
  }, [fetchCart, loadAddresses]);

  const handleAddressFormChange = (field: keyof AddressFormData, value: string) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async () => {
    const { fullName, phone, addressLine1, city, state, pincode } = addressForm;
    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      const { data } = await userAPI.addAddress(addressForm);
      const newAddr = data.data;
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      setShowAddressForm(false);
      setAddressForm(emptyAddress);
      toast.success('Address saved!');
    } catch {
      toast.error('Failed to save address');
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'FREEZE15') {
      const discount = Math.round(subtotal * 0.15);
      setCouponDiscount(discount);
      setCouponApplied(true);
      toast.success('Coupon applied! 15% off');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsPlacing(true);

    try {
      // Step 1: Create order
      const orderRes = await orderAPI.place({
        addressId: selectedAddressId,
        notes: orderNotes || undefined,
      });
      const order = orderRes.data.data;

      // Step 2: Create Razorpay payment order
      const paymentRes = await paymentAPI.createOrder(order.id);
      const paymentData = paymentRes.data.data;

      // Step 3: Load Razorpay
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Payment system failed to load. Please try again.');
        setIsPlacing(false);
        return;
      }

      // Step 4: Open Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: paymentData.amount,
        currency: paymentData.currency || 'INR',
        name: 'FreezeDance',
        description: `Order #${order.orderNumber}`,
        order_id: paymentData.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Step 5: Verify payment
            await paymentAPI.verify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            setOrderNumber(order.orderNumber);
            setOrderSuccess(true);
            clearCart();
            toast.success('Payment successful!');
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
          setIsPlacing(false);
        },
        prefill: {
          name: addresses.find((a) => a.id === selectedAddressId)?.fullName,
          contact: addresses.find((a) => a.id === selectedAddressId)?.phone,
        },
        theme: { color: '#171717' },
        modal: {
          ondismiss: () => {
            setIsPlacing(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Failed to place order. Please try again.');
      setIsPlacing(false);
    }
  };

  // ── Order Success Screen ──────────────────────────────────────
  if (orderSuccess) {
    return (
      <>
        <SuccessConfetti />
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 12 }}
              className="w-20 h-20 mx-auto mb-6 bg-[#FAFAFA] rounded-full flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <Check className="w-10 h-10 text-[#171717]" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#171717] mb-2"
            >
              Order Placed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#6B7280] mb-2"
            >
              Thank you for your order
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 py-2 bg-[#FAFAFA] rounded-lg mb-8"
            >
              <span className="text-sm text-[#6B7280]">Order Number: </span>
              <span className="font-bold text-[#171717]">{orderNumber}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/account/orders">
                <button className="btn-primary">
                  View Order
                </button>
              </Link>
              <Link href="/shop">
                <button className="btn-secondary">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  // ── Main Checkout ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#171717] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#171717]">
            Checkout
          </h1>
        </motion.div>

        {items.length === 0 && !orderSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-[#FAFAFA] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-7 h-7 text-[#6B7280]" />
            </div>
            <h2 className="text-xl font-bold text-[#171717] mb-2">Your cart is empty</h2>
            <p className="text-[#6B7280] mb-6">Add some items to proceed with checkout</p>
            <Link href="/shop">
              <button className="btn-primary">
                Browse Products
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* ── Shipping Address ────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#171717]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#171717]">Shipping Address</h2>
                </div>

                {/* Saved Addresses */}
                {!loadingAddresses && addresses.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAddressId === addr.id
                            ? 'border-[#171717] bg-[#FAFAFA]'
                            : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => {
                            setSelectedAddressId(addr.id);
                            setShowAddressForm(false);
                          }}
                          className="mt-1 accent-[#171717]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-[#171717]">{addr.fullName}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] bg-[#171717] text-white px-2 py-0.5 rounded font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B7280] mt-1">
                            {addr.addressLine1}
                            {addr.addressLine2 && `, ${addr.addressLine2}`}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-xs text-[#9CA3AF] mt-1">{addr.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* Add New Address Button */}
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full py-3 border-2 border-dashed border-[#E5E7EB] rounded-full text-sm font-medium text-[#6B7280] hover:border-[#705d00] hover:text-[#705d00] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </button>
                )}

                {/* Address Form */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.fullName}
                              onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={addressForm.phone}
                              onChange={(e) => handleAddressFormChange('phone', e.target.value)}
                              placeholder="9876543210"
                              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                            Address Line 1 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={addressForm.addressLine1}
                            onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                            placeholder="House/Flat No., Building, Street"
                            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            value={addressForm.addressLine2}
                            onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                            placeholder="Landmark, Area (optional)"
                            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.city}
                              onChange={(e) => handleAddressFormChange('city', e.target.value)}
                              placeholder="City"
                              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                              State <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={addressForm.state}
                                onChange={(e) => handleAddressFormChange('state', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all appearance-none bg-white"
                              >
                                <option value="">Select</option>
                                {indianStates.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                              Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.pincode}
                              onChange={(e) => handleAddressFormChange('pincode', e.target.value)}
                              placeholder="560001"
                              maxLength={6}
                              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={handleSaveAddress}
                            className="btn-primary"
                          >
                            Save Address
                          </button>
                          {addresses.length > 0 && (
                            <button
                              onClick={() => setShowAddressForm(false)}
                              className="px-6 py-2.5 text-[#6B7280] text-sm font-medium hover:text-[#705d00] transition-colors rounded-full"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Coupon Code ─────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-[#171717]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#171717]">Coupon Code</h2>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      if (couponApplied) {
                        setCouponApplied(false);
                        setCouponDiscount(0);
                      }
                    }}
                    placeholder="Enter coupon code"
                    disabled={couponApplied}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm transition-all disabled:bg-[#FAFAFA] uppercase tracking-wider"
                  />
                  <button
                    onClick={couponApplied ? () => { setCouponApplied(false); setCouponDiscount(0); setCouponCode(''); } : handleApplyCoupon}
                    className={`${
                      couponApplied
                        ? 'px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-red-50 text-red-600 hover:bg-red-100'
                        : 'btn-primary'
                    }`}
                  >
                    {couponApplied ? 'Remove' : 'Apply'}
                  </button>
                </div>

                {couponApplied && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#171717] mt-3 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Coupon applied! You save {'\u20B9'}{couponDiscount}
                  </motion.p>
                )}
              </motion.div>

              {/* ── Order Notes ─────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB]"
              >
                <h2 className="text-lg font-semibold text-[#171717] mb-3">Order Notes (optional)</h2>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special instructions for your order..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none text-sm resize-none transition-all"
                />
              </motion.div>

              {/* ── Payment Section ────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#171717]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#171717]">Payment</h2>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#FAFAFA] rounded-lg border border-[#F3F4F6]">
                  <div className="w-12 h-8 bg-[#171717] rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#171717]">Razorpay Secure Payment</p>
                    <p className="text-xs text-[#6B7280]">UPI, Cards, Net Banking, Wallets</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#6B7280] ml-auto" />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing || !selectedAddressId}
                  className="btn-primary w-full mt-5 !py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPlacing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order - {'\u20B9'}{total.toFixed(0)}
                    </>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB] sticky top-28"
              >
                <h2 className="text-lg font-semibold text-[#171717] mb-5">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-5 max-h-[360px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg bg-[#FAFAFA] overflow-hidden flex-shrink-0 border border-[#F3F4F6]">
                        {item.productImage ? (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-[#6B7280]" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#171717] line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-[#6B7280]">{item.variantName} x {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-[#171717] whitespace-nowrap">
                        {'\u20B9'}{item.subtotal.toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-[#F3F4F6] pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Subtotal</span>
                    <span className="text-[#171717]">{'\u20B9'}{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Shipping
                    </span>
                    <span className={`text-[#171717] ${shippingCost === 0 ? 'font-medium' : ''}`}>
                      {shippingCost === 0 ? 'FREE' : `\u20B9${shippingCost}`}
                    </span>
                  </div>
                  {couponApplied && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-[#171717] flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Discount
                      </span>
                      <span className="text-[#171717] font-medium">-{'\u20B9'}{couponDiscount}</span>
                    </motion.div>
                  )}
                  <div className="h-px bg-[#F3F4F6]" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#171717]">Total</span>
                    <span className="font-bold text-xl text-[#171717]">{'\u20B9'}{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-5 pt-4 border-t border-[#F3F4F6] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure SSL encrypted payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free delivery on orders above {'\u20B9'}999</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
