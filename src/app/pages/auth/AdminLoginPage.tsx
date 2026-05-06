import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/app/components/ui/button'
import { FormField } from '@/app/components/forms/FormField'
import { PasswordInput } from '@/app/components/forms/PasswordInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { ThemeToggle } from '@/app/components/ui/theme-toggle'
import { Shield, ShieldCheck, AlertCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { getRoleHomePath } from '@/app/utils/roleRouting'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email.endsWith('@eventra.com')) {
        setError('Admin access requires an @eventra.com email address')
        setLoading(false)
        return
      }

      const loggedInUser = await login(email, password, 'admin')

      if (loggedInUser) {
        toast.success('Admin access granted')
        navigate(getRoleHomePath(loggedInUser.role))
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-error-50/20 dark:to-error-950/20 flex items-center justify-center p-4">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-ds-xl bg-gradient-to-br from-error-600 to-error-500 shadow-lg shadow-error-500/30 mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <Badge className="mb-4 bg-error-50 dark:bg-error-950/30 text-error-700 dark:text-error-300 border-error-200 dark:border-error-800 px-4 py-2">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Administrator Access
          </Badge>
          <h1 className="text-heading-2 text-foreground mb-2">Admin Portal</h1>
        </div>

        <Card className="shadow-xl rounded-ds-xl border-border">
          <CardHeader>
            <CardTitle className="text-heading-4 text-foreground">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800 rounded-ds-md"
                >
                  <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                  <p className="text-body-small text-error-700 dark:text-error-300">{error}</p>
                </motion.div>
              )}

              <FormField label="Admin Email" required>
                <input
                  type="email"
                  placeholder="admin@eventra.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-11 w-full rounded-ds-md border border-border bg-background px-3 py-2 text-body transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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

              <Button type="submit" className="w-full h-11 bg-error-600 hover:bg-error-700" loading={loading}>
                {loading ? 'Authenticating...' : 'Secure Sign In'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-body-small text-neutral-600 dark:text-neutral-400">
                Not an admin?{' '}
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors font-medium"
                >
                  Sign in normally
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
