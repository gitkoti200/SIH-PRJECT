'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/dashboard';
import Header from '@/components/header';
import { getAnalyzedComments } from '@/lib/data';
import Loader from '@/components/loader';

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
      // If not authenticated, redirect to login.
      router.push('/login');
    }
  }, [router]);

  // While checking for authentication, show a loading spinner.
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-800">
        <Loader />
      </div>
    );
  }
  
  // If authenticated, show the dashboard content.
  if (isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Dashboard initialComments={analyzedComments} />
        </main>
      </div>
    );
  }

  // This return is for the case where we are redirecting, it will briefly show a loader.
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <Loader />
    </div>
  );
}
