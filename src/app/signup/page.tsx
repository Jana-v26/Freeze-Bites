'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): string | null => {
    if (!name.trim()) return 'Full name is required';
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    if (!phone.trim()) return 'Phone number is required';
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) return 'Enter a valid 10-digit phone number';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setIsLoading(true);
    try {
      await signup(name.trim(), email.trim(), phone.trim(), password);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full pl-12 pr-4 py-3.5 bg-white rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none transition-all text-[#171717] placeholder:text-[#6B7280]';

  const inputWithToggleClass =
    'w-full pl-12 pr-12 py-3.5 bg-white rounded-lg border border-[#E5E7EB] focus:border-[#705d00] focus:ring-1 focus:ring-[#705d00] outline-none transition-all text-[#171717] placeholder:text-[#6B7280]';

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#171717]">Create Account</h1>
          <p className="text-[#6B7280] mt-2">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className={inputClass}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 8 characters)"
              className={inputWithToggleClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#171717] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={inputWithToggleClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#171717] transition-colors"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#705d00] to-[#a08800] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#705d00]/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-[#6B7280] mt-8">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[#171717] font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
