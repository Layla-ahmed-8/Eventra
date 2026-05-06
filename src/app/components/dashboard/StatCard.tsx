import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '../../../utils/designSystem';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  gradient?: 'purple' | 'blue' | 'orange' | 'green';
  className?: string;
}

const gradientConfig = {
  purple: {
    bg: 'from-purple-500/10 to-purple-600/10',
    icon: 'bg-gradient-to-br from-purple-500 to-purple-600',
    glow: 'shadow-purple-500/20',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/10',
    icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  orange: {
    bg: 'from-orange-500/10 to-orange-600/10',
    icon: 'bg-gradient-to-br from-orange-500 to-orange-600',
    glow: 'shadow-orange-500/20',
  },
  green: {
    bg: 'from-green-500/10 to-green-600/10',
    icon: 'bg-gradient-to-br from-green-500 to-green-600',
    glow: 'shadow-green-500/20',
  },
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient = 'purple',
  className,
}: StatCardProps) {
  const config = gradientConfig[gradient];
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {/* Gradient Background */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', config.bg)} />

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          </div>
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl shadow-lg',
              config.icon,
              config.glow
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>

          {/* Change Indicator */}
          {change !== undefined && (
            <div className="flex items-center gap-2">
              {isPositive && (
                <>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{Math.abs(change)}%</span>
                  </div>
                  {changeLabel && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{changeLabel}</span>
                  )}
                </>
              )}
              {isNegative && (
                <>
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{change}%</span>
                  </div>
                  {changeLabel && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{changeLabel}</span>
                  )}
                </>
              )}
              {!isPositive && !isNegative && changeLabel && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
