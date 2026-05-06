import React from 'react'
import { Label } from '@/app/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  id?: string
}

export function FormField({
  label,
  description,
  error,
  required,
  className,
  children,
  id,
}: FormFieldProps) {
  const fieldId = id || React.useId()

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label
          htmlFor={fieldId}
          className={cn(
            'text-body-small font-medium',
            error && 'text-error-600 dark:text-error-400'
          )}
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </Label>
      )}

      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': description || error ? `${fieldId}-description` : undefined,
          'aria-invalid': error ? 'true' : 'false',
        })}
      </div>

      {(description || error) && (
        <div
          id={`${fieldId}-description`}
          className={cn(
            'text-caption',
            error
              ? 'text-error-600 dark:text-error-400'
              : 'text-neutral-600 dark:text-neutral-400'
          )}
        >
          {error || description}
        </div>
      )}
    </div>
  )
}