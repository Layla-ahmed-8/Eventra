import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../../utils/designSystem';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  validation?: (value: string) => string | null;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  aiSuggestion?: string;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  validation,
  required = false,
  placeholder,
  hint,
  aiSuggestion,
  disabled = false,
  className,
}: FormFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (touched && validation) {
      const validationError = validation(value);
      setError(validationError);
      setIsValid(!validationError && value.length > 0);
    }
  }, [value, touched, validation]);

  const handleBlur = () => {
    setTouched(true);
    if (onBlur) onBlur();
  };

  const applySuggestion = () => {
    if (aiSuggestion) {
      onChange(aiSuggestion);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className="flex items-center gap-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'transition-all',
            error && touched && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            isValid && 'border-green-500 focus:border-green-500 focus:ring-green-500'
          )}
        />

        {/* Validation Icons */}
        {touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && touched && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Hint */}
      {hint && !error && (
        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{hint}</p>
        </div>
      )}

      {/* AI Suggestion */}
      {aiSuggestion && !value && (
        <button
          type="button"
          onClick={applySuggestion}
          className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors w-full"
        >
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-xs text-white">✨</span>
            </div>
            <span className="font-medium">AI Suggestion:</span>
          </div>
          <span className="flex-1 text-left truncate">{aiSuggestion}</span>
          <span className="text-xs opacity-70">Click to apply</span>
        </button>
      )}
    </div>
  );
}
