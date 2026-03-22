'use client';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LenisProvider from './LenisProvider';
import { useAuthStore } from '@/store/authStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <LenisProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#171717',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
    </LenisProvider>
  );
}
