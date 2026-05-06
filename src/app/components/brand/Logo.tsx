import * as React from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

export type LogoVariant = 'default' | 'white' | 'minimal';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  /** “AI EventHub” under wordmark */
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
  variant?: LogoVariant;
}

/** Spark Pin — location + network + AI glow (product spec) */
function SparkPinMark({
  sizeClass,
  variant,
}: {
  sizeClass: { box: string };
  variant: LogoVariant;
}) {
  const mono = variant === 'white';
  const uid = React.useId().replace(/:/g, '');
  const gidStroke = `spark-pin-stroke-${uid}`;
  const fidGlow = `spark-glow-${uid}`;
  return (
    <svg
      viewBox="0 0 40 48"
      className={cn(sizeClass.box, 'shrink-0')}
      aria-hidden
    >
      <defs>
        <linearGradient id={gidStroke} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={mono ? '#ffffff' : '#6c4cf1'} />
          <stop offset="100%" stopColor={mono ? '#e9e9e9' : '#8b7cff'} />
        </linearGradient>
        <filter id={fidGlow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Pin silhouette */}
      <path
        d="M20 2.5C12.2 2.5 6 8.7 6 16.5c0 8.2 11.2 20.8 13.4 23.1.4.4 1 .7 1.6.7s1.2-.3 1.6-.7C24.8 37.3 34 25.7 34 16.5 34 8.7 27.8 2.5 20 2.5Z"
        fill={variant === 'white' ? 'none' : '#faf9ff'}
        stroke={`url(#${gidStroke})`}
        strokeWidth={variant === 'white' ? 2 : 1.75}
        className={cn(variant !== 'white' && 'dark:fill-[#141824]')}
      />
      {/* Network */}
      <g stroke={mono ? '#ffffff' : '#00c2ff'} strokeWidth="1.1" opacity={mono ? 0.85 : 0.95}>
        <line x1="14" y1="17" x2="20" y2="14" />
        <line x1="20" y1="14" x2="26" y2="17" />
        <line x1="14" y1="17" x2="20" y2="23" />
        <line x1="26" y1="17" x2="20" y2="23" />
      </g>
      <circle cx="14" cy="17" r="2" fill={mono ? '#ffffff' : '#38bdf8'} />
      <circle cx="26" cy="17" r="2" fill={mono ? '#ffffff' : '#38bdf8'} />
      <circle cx="20" cy="23" r="2" fill={mono ? '#ffffff' : '#38bdf8'} />
      {/* AI spark node */}
      <circle
        cx="20"
        cy="14"
        r="2.8"
        fill={mono ? '#ffffff' : '#ff8a00'}
        filter={variant === 'default' ? `url(#${fidGlow})` : undefined}
        className={cn(!mono && 'animate-pulse')}
      />
    </svg>
  );
}

export function Logo({
  size = 'md',
  showText = true,
  showTagline = false,
  className = '',
  asLink = true,
  variant = 'default',
}: LogoProps) {
  const sizes = {
    sm: { box: 'h-8 w-8', text: 'text-lg', tag: 'text-[11px]', gap: 'gap-2' },
    md: { box: 'h-10 w-10', text: 'text-xl', tag: 'text-xs', gap: 'gap-2.5' },
    lg: { box: 'h-14 w-14', text: 'text-3xl', tag: 'text-sm', gap: 'gap-3' },
  };
  const s = sizes[size];

  const wordmarkClass =
    variant === 'white'
      ? 'font-bold tracking-tight text-white'
      : 'font-bold tracking-tight text-[var(--color-text-heading)]';

  const content = (
    <div className={cn('flex items-center', s.gap)}>
      <SparkPinMark sizeClass={{ box: s.box }} variant={variant} />
      {(showText || showTagline) && (
        <div className="flex flex-col leading-tight">
          <span className={cn(s.text, wordmarkClass)} style={{ letterSpacing: '-0.01em' }}>
            Eventra
          </span>
          {showTagline && (
            <span
              className={cn(
                s.tag,
                'font-medium text-[var(--color-text-muted)]',
                variant === 'white' && 'text-white/75'
              )}
            >
              AI EventHub
            </span>
          )}
        </div>
      )}
    </div>
  );

  const wrapClass = cn('group inline-flex items-center', className);

  if (asLink) {
    return (
      <Link to="/" className={wrapClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapClass}>{content}</div>;
}

export function LogoIcon({ size = 'md', className = '', variant = 'default' }: Pick<LogoProps, 'size' | 'className' | 'variant'>) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' };
  return (
    <div className={className}>
      <SparkPinMark sizeClass={{ box: sizes[size] }} variant={variant} />
    </div>
  );
}
