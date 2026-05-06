import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { Button } from './button';
import { cn } from '../../../utils/designSystem';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  className, 
  variant = 'ghost',
  size = 'sm',
  showLabel = false 
}: ThemeToggleProps) {
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn('rounded-xl', className)}
      aria-label="Toggle theme"
    >
      {actualTheme === 'light' ? (
        <>
          <Moon className="h-5 w-5" />
          {showLabel && <span className="ml-2">Dark Mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          {showLabel && <span className="ml-2">Light Mode</span>}
        </>
      )}
    </Button>
  );
}
