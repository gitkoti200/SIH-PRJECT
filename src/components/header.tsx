import { Icons } from './icons';

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
             <Icons.Logo className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Sentiment analysis of reviewed comments
          </h1>
        </div>
      </div>
    </header>
  );
}
