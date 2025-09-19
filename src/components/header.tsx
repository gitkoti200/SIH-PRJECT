import { Icons } from './icons';
import { ThemeToggle } from './theme-toggle';
import UserNav from './user-nav';

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
             <Icons.Logo className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-logo tracking-tight text-foreground text-3d">
            Sentiment analysis of reviewed comments
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
