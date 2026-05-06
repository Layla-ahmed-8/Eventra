import { ReactNode } from 'react';
import { UnifiedSidebar } from '../layout/UnifiedSidebar';
import { MobileBottomNav } from '../layout/MobileBottomNav';

interface EventraMainLayoutProps {
  children: ReactNode;
}

export function EventraMainLayout({ children }: EventraMainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-60 lg:flex-col">
        <UnifiedSidebar />
      </div>

      <div className="flex w-full flex-1 flex-col lg:pl-60">
        <main className="flex-1 overflow-y-auto">
          <div className="pb-20 lg:pb-0">
            {children}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
}

export default EventraMainLayout;
