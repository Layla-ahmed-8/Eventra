import { useState } from 'react';
import { Menu, X, Sparkles, Bell, UserCircle } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { Logo } from '../brand/Logo';

const navItems = [
  { label: 'Discover', href: '/discover' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Communities', href: '/communities' },
  { label: 'For Organizers', href: '/organizer' },
];

export function EventraTopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-background/90 backdrop-blur-xl shadow-sm dark:border-neutral-800">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <p className="text-sm font-semibold text-primary-700">Eventra</p>
            <p className="text-xs text-neutral-500">AI EventHub</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-neutral-700 transition hover:text-primary-600">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" className="rounded-full border border-neutral-200 px-4 py-2">
            <Sparkles className="h-4 w-4" />
            AI Search
          </Button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200">
            <Bell className="h-5 w-5" />
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700">
            <UserCircle className="h-5 w-5" />
          </button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] p-6">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button variant="gradient" className="rounded-2xl py-3">AI Search</Button>
              <Button variant="outline" className="rounded-2xl py-3">Log in</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
