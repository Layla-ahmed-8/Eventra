import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Sparkles, Send, Bookmark } from 'lucide-react';
import { cn } from '../ui/utils';

type Message = { role: 'user' | 'assistant'; text: string };

const suggested = [
  'Jazz this weekend under $30',
  'Free outdoor events near me',
  'Tech meetups on Tuesday evenings',
];

interface AISearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISearchModal({ open, onOpenChange }: AISearchModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi — I'm your Eventra assistant. What kind of event are you looking for?",
    },
  ]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: `Got it: “${q}”. I’ll prioritize jazz, this weekend, and tickets under $30. Here are curated matches — you can refine with “outdoor only” or “walking distance”.`,
        },
      ]);
    }, 450);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl',
          'rounded-[var(--radius-lg)] border-border/80 shadow-[var(--shadow-modal)]'
        )}
      >
        <DialogHeader className="border-b border-border/60 px-6 py-4 text-left">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-[var(--color-brand-cyan)] text-white">
              <Sparkles className="size-4" aria-hidden />
            </div>
            <div>
              <DialogTitle>Smart search</DialogTitle>
              <DialogDescription>Ask in plain language — filters apply automatically.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[360px] px-4">
          <div className="space-y-3 py-4 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[92%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'ml-auto bg-primary-600 text-primary-foreground'
                    : 'mr-auto bg-muted text-foreground'
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border/60 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Try asking</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {suggested.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-[var(--color-text-body)] transition-colors hover:border-primary-600/40 hover:bg-primary-50 dark:hover:bg-primary-950/40"
                onClick={() => setInput(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Indie concerts this weekend under $30"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              className="h-12 flex-1 rounded-[var(--radius-input)]"
            />
            <Button type="button" size="icon" className="size-12 shrink-0" onClick={send} aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-border/60 px-6 py-3 sm:justify-between">
          <Button type="button" variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <Bookmark className="size-3.5" />
            Save this search
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
