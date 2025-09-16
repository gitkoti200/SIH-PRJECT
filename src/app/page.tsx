'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/dashboard';
import Header from '@/components/header';
import { getAnalyzedComments } from '@/lib/data';
import type { AnalyzedComment } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const analyzedComments = getAnalyzedComments();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/otp');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or a minimal loading state while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard initialComments={analyzedComments} />
      </main>
    </div>
  );
}
