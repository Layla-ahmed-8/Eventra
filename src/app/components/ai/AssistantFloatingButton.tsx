import { Assistant } from 'lucide-react';
import { Button } from '../ui/button';

interface AssistantFloatingButtonProps {
  onOpen: () => void;
}

export function AssistantFloatingButton({ onOpen }: AssistantFloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] hidden md:block">
      <Button
        variant="gradient"
        size="icon"
        className="h-14 w-14 rounded-full p-0 shadow-[0_18px_40px_rgba(108,76,241,0.24)]"
        onClick={onOpen}
        aria-label="Open AI Assistant"
      >
        <Assistant className="h-6 w-6 text-white" />
      </Button>
      <div className="mt-3 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-lg ring-1 ring-black/5">
        Ask Eventra
      </div>
    </div>
  );
}
