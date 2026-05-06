import React from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { AlertCircle, RefreshCw, Home, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  onGoHome?: () => void
  onContactSupport?: () => void
  showSupport?: boolean
  className?: string
  variant?: 'card' | 'alert' | 'full'
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  onGoHome,
  onContactSupport,
  showSupport = true,
  className,
  variant = 'card',
}: ErrorStateProps) {
  const content = (
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-error-100 dark:bg-error-900/20 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-error-600 dark:text-error-400" />
      </div>

      <div className="space-y-2">
        <h3 className="text-heading-4 text-foreground">
          {title}
        </h3>
        <p className="text-body text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
        {onGoHome && (
          <Button onClick={onGoHome} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        )}
        {showSupport && onContactSupport && (
          <Button onClick={onContactSupport} variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        )}
      </div>
    </div>
  )

  if (variant === 'alert') {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm">{message}</p>
            </div>
            {(onRetry || onGoHome || (showSupport && onContactSupport)) && (
              <div className="flex flex-wrap gap-2">
                {onRetry && (
                  <Button onClick={onRetry} size="sm" variant="outline">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Retry
                  </Button>
                )}
                {onGoHome && (
                  <Button onClick={onGoHome} size="sm" variant="outline">
                    <Home className="mr-1 h-3 w-3" />
                    Home
                  </Button>
                )}
                {showSupport && onContactSupport && (
                  <Button onClick={onContactSupport} size="sm" variant="outline">
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Support
                  </Button>
                )}
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (variant === 'full') {
    return (
      <div className={cn('min-h-[400px] flex items-center justify-center', className)}>
        {content}
      </div>
    )
  }

  return (
    <Card className={cn('text-center', className)}>
      <CardContent className="py-12">
        {content}
      </CardContent>
    </Card>
  )
}

// Specific error states
export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection lost"
      message="Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

export function NotFoundErrorState({ onGoHome }: { onGoHome?: () => void }) {
  return (
    <ErrorState
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      onGoHome={onGoHome}
      showSupport={false}
    />
  )
}

export function PermissionErrorState({ onGoHome }: { onGoHome?: () => void }) {
  return (
    <ErrorState
      title="Access denied"
      message="You don't have permission to access this resource."
      onGoHome={onGoHome}
      showSupport={true}
    />
  )
}