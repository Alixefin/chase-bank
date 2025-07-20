'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authTimer = setTimeout(() => {
      if (user) {
        router.replace('/dashboard');
      } else {
        // Stay on loading for a bit then go to login
        setTimeout(() => setLoading(false), 1500);
      }
    }, 100);

    return () => clearTimeout(authTimer);
  }, [user, router]);

  useEffect(() => {
    if (!loading) {
      router.replace('/login');
    }
  }, [loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-primary">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  // This will be shown briefly before redirecting if not loading
  return (
     <div className="flex h-screen w-full items-center justify-center bg-primary">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
  );
}
