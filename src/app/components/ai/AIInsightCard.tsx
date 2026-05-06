import { Sparkles, TrendingUp, Lightbulb, Target, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../../utils/designSystem';

interface AIInsightCardProps {
  title: string;
  description: string;
  type?: 'suggestion' | 'prediction' | 'insight' | 'recommendation' | 'alert';
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const typeConfig = {
  suggestion: {
    icon: Lightbulb,
    gradient: 'from-purple-500/10 to-blue-500/10',
    border: 'border-purple-500/30',
    badge: 'AI Suggested',
    badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
  },
  prediction: {
    icon: TrendingUp,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/30',
    badge: 'AI Prediction',
    badgeColor: 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
  },
  insight: {
    icon: Sparkles,
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/30',
    badge: 'AI Insight',
    badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
  },
  recommendation: {
    icon: Target,
    gradient: 'from-orange-500/10 to-red-500/10',
    border: 'border-orange-500/30',
    badge: 'Recommended',
    badgeColor: 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
  },
  alert: {
    icon: Zap,
    gradient: 'from-yellow-500/10 to-orange-500/10',
    border: 'border-yellow-500/30',
    badge: 'AI Alert',
    badgeColor: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
  },
};

export function AIInsightCard({
  title,
  description,
  type = 'insight',
  icon,
  action,
  className,
}: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = icon || config.icon;

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        config.border,
        className
      )}
    >
      {/* Gradient Background */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', config.gradient)} />

      {/* Content */}
      <div className="relative p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <Badge className={cn('text-xs', config.badgeColor)}>
                <Sparkles className="w-3 h-3 mr-1" />
                {config.badge}
              </Badge>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Action */}
        {action && <div className="pt-2">{action}</div>}
      </div>
    </Card>
  );
}
