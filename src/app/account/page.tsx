'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User, Package, MapPin, Edit3, Save, Trash2, Plus, ChevronDown, ChevronUp,
  Loader2, LogOut, Phone, Mail, X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { userAPI, orderAPI } from '@/lib/api';
import { Order, Address } from '@/types';

type Tab = 'profile' | 'orders' | 'addresses';

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
];

const statusColors: Record<string, string> = {
  PENDING: 'text-amber-600',
  CONFIRMED: 'text-blue-600',
  PROCESSING: 'text-indigo-600',
  SHIPPED: 'text-purple-600',
  DELIVERED: 'text-green-600',
  CANCELLED: 'text-red-600',
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#171717]" />
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#171717]">My Account</h1>
            <p className="text-[#6B7280] text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-[#171717] font-medium text-sm hover:underline flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-8 mt-8 border-b border-[#E5E7EB]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#171717]'
                  : 'text-[#6B7280] hover:text-[#171717]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeAccountTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#171717]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && <ProfileTab key="profile" user={user} />}
          {activeTab === 'orders' && <OrdersTab key="orders" />}
          {activeTab === 'addresses' && <AddressesTab key="addresses" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Profile Tab
   ────────────────────────────────────────────── */
function ProfileTab({ user }: { user: { id: number; name: string; email: string; phone: string; role: string } }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const loadUser = useAuthStore((s) => s.loadUser);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setIsSaving(true);
    try {
      await userAPI.updateProfile({ name: name.trim(), phone: phone.trim() });
      await loadUser();
      toast.success('Profile updated!');
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none transition-all text-[#171717]';

  const readonlyClass =
    'w-full px-4 py-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] text-[#171717]';

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#171717]">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-[#171717] text-sm font-medium hover:underline"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            ) : (
              <p className={readonlyClass}>{user.name}</p>
            )}
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <p className={readonlyClass + ' text-[#6B7280]'}>{user.email}</p>
            {isEditing && (
              <p className="text-xs text-[#6B7280] mt-1.5 ml-1">Email cannot be changed</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="Enter phone number"
              />
            ) : (
              <p className={readonlyClass}>{user.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Action buttons */}
          {isEditing && (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white rounded-full font-medium text-sm disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setName(user.name);
                  setPhone(user.phone || '');
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 text-[#6B7280] rounded-lg font-medium text-sm hover:text-[#171717] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Orders Tab
   ────────────────────────────────────────────── */
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await orderAPI.getAll();
        setOrders(data.data || []);
      } catch {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#171717]" />
      </motion.div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        <div className="bg-white rounded-lg border border-[#F3F4F6] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-5 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
            <Package className="w-8 h-8 text-[#6B7280]" />
          </div>
          <h3 className="text-lg font-bold text-[#171717] mb-2">No orders yet</h3>
          <p className="text-[#6B7280] mb-6">Start shopping to see your orders here!</p>
          <a
            href="/shop"
            className="inline-flex px-6 py-2.5 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white rounded-full font-medium text-sm"
          >
            Browse Products
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg border border-[#F3F4F6] overflow-hidden"
        >
          <button
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors"
          >
            <div className="flex items-center gap-4 text-left">
              <div>
                <p className="font-medium text-[#171717]">#{order.orderNumber}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold ${statusColors[order.status] || 'text-gray-600'}`}>
                {order.status}
              </span>
              <span className="font-medium text-[#171717] hidden sm:block">
                &#8377;{order.totalAmount.toLocaleString('en-IN')}
              </span>
              {expandedOrder === order.id ? (
                <ChevronUp className="w-4 h-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {expandedOrder === order.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-[#F3F4F6] pt-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2.5 px-4 bg-[#F9FAFB] rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm text-[#171717]">{item.productName}</p>
                          <p className="text-[#6B7280] text-xs">{item.variantName} x {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm text-[#171717]">
                          &#8377;{item.subtotal.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F3F4F6]">
                    <span className="text-[#6B7280] font-medium text-sm">Total</span>
                    <span className="font-bold text-[#171717]">
                      &#8377;{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Addresses Tab
   ────────────────────────────────────────────── */
function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = { fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', isDefault: false };
  const [form, setForm] = useState(emptyForm);

  const fetchAddresses = async () => {
    try {
      const { data } = await userAPI.getAddresses();
      setAddresses(data.data || []);
    } catch {
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.addressLine1 || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSaving(true);
    try {
      await userAPI.addAddress(form);
      toast.success('Address added!');
      setShowForm(false);
      setForm(emptyForm);
      await fetchAddresses();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to add address');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userAPI.deleteAddress(id);
      toast.success('Address removed');
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch {
      toast.error('Failed to delete address');
    }
  };

  if (loading) {
    return (
      <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#171717]" />
      </motion.div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none transition-all text-[#171717] text-sm placeholder:text-[#6B7280]';

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      {/* Add address button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white rounded-full text-sm font-medium"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add New Address'}
        </button>
      </div>

      {/* Add address form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleAdd}
              className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-4"
            >
              <h3 className="text-lg font-bold text-[#171717] mb-2">New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Address Line 1 *"
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                className={inputClass}
                required
              />
              <input
                type="text"
                placeholder="Address Line 2 (optional)"
                value={form.addressLine2}
                onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                className={inputClass}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City *"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode *"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E7EB] text-[#705d00] focus:ring-[#705d00] accent-[#705d00]"
                />
                <span className="text-sm text-[#6B7280]">Set as default address</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white rounded-full font-medium text-sm disabled:opacity-70 mt-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {saving ? 'Adding...' : 'Add Address'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address list */}
      {addresses.length === 0 && !showForm ? (
        <div className="bg-white rounded-lg border border-[#F3F4F6] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-5 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-[#6B7280]" />
          </div>
          <h3 className="text-lg font-bold text-[#171717] mb-2">No addresses saved</h3>
          <p className="text-[#6B7280]">Add a delivery address to speed up checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-lg border border-[#F3F4F6] p-5 relative group"
            >
              {addr.isDefault && (
                <span className="absolute top-4 right-4 text-xs font-semibold text-[#171717]">
                  Default
                </span>
              )}
              <h4 className="font-medium text-[#171717] mb-1">{addr.fullName}</h4>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {addr.addressLine1}
                {addr.addressLine2 && <>, {addr.addressLine2}</>}
                <br />
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-[#6B7280] text-sm mt-2">{addr.phone}</p>

              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 text-xs font-medium hover:underline transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
