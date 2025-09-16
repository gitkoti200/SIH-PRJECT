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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const analyzedComments = getAnalyzedComments();

  useEffect(() => {
    // This check runs only on the client-side
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (isAuthenticated === null) {
    // While checking for authentication, show a loader
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // This will be shown briefly while the redirect to /login happens
     return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
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
