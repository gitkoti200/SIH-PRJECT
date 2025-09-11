import Dashboard from '@/components/dashboard';
import Header from '@/components/header';
import { getAnalyzedComments } from '@/lib/data';

export default async function Home() {
  const analyzedComments = getAnalyzedComments();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard initialComments={analyzedComments} />
      </main>
    </div>
  );
}
