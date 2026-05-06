import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/app/components/ui/button'
import { AuthLayout } from '@/app/components/layout/AuthLayout'
import { FormField } from '@/app/components/forms/FormField'
import { PasswordInput } from '@/app/components/forms/PasswordInput'
import { Card, CardContent } from '@/app/components/ui/card'
import { ThemeToggle } from '@/app/components/ui/theme-toggle'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { getRoleHomePath } from '@/app/utils/roleRouting'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loggedInUser = await login(email, password)
      if (loggedInUser) {
        toast.success('Welcome back! 🎉')
        navigate(getRoleHomePath(loggedInUser.role))
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string, role: string) => {
    setLoading(true)
    setEmail(demoEmail)
    setPassword('demo')
    setError('')

    try {
      const loggedInUser = await login(demoEmail, 'demo')
      if (loggedInUser) {
        toast.success(`Welcome back, ${role}! 🎉`)
        navigate(getRoleHomePath(loggedInUser.role))
      } else {
        setError('Demo login failed. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to Eventra — AI EventHub">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Email address" required>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-11 w-full rounded-ds-md border border-border bg-background px-3 py-2 text-body transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              required
              disabled={loading}
            />
          </FormField>

          <FormField label="Password" required>
            <PasswordInput
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </FormField>

          {error && <div className="text-body-small text-error-600 dark:text-error-400">{error}</div>}



          <Button type="submit" className="w-full h-11" loading={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-body-small text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary-600 hover:text-primary-700 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <Card className="bg-neutral-50 dark:bg-neutral-900/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h4 className="text-heading-6 text-foreground">Try a Demo Account</h4>
            </div>
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => handleDemoLogin('sarah@example.com', 'Attendee')}
                disabled={loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-body-small font-semibold flex-1 text-left">Attendee Demo</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => handleDemoLogin('ahmed@example.com', 'Organizer')}
                disabled={loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-body-small font-semibold flex-1 text-left">Organizer Demo</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => handleDemoLogin('admin@eventra.com', 'Admin')}
                disabled={loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-body-small font-semibold flex-1 text-left">Admin Demo</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  )
}
