'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Beaker, Mail, Lock, User, AlertCircle, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'free'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      // In production, this would call an API to create the user
      // For now, just simulate and redirect
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to onboarding or dashboard
      router.push('/onboarding')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const planLabels: Record<string, string> = {
    free: 'Free',
    premium: 'Premium',
    pro: 'Pro',
  }

  return (
    <main className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary-950/50 to-background-dark" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-md bg-slate-800/50 border-slate-700/50">
        <CardHeader className="text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Peptide</span>
          </Link>

          <CardTitle className="text-2xl text-white">Create your account</CardTitle>
          <CardDescription className="text-slate-400">
            Start your health journey with the{' '}
            <span className="text-primary-400 font-medium">{planLabels[plan]}</span> plan
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-accent-500/10 border border-accent-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-accent-400" />
                <p className="text-sm text-accent-400">{error}</p>
              </div>
            )}

            <Input
              type="text"
              name="name"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            {/* Password Requirements */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Check
                  className={`w-4 h-4 ${
                    formData.password.length >= 8 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                />
                <span
                  className={
                    formData.password.length >= 8 ? 'text-slate-300' : 'text-slate-500'
                  }
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check
                  className={`w-4 h-4 ${
                    formData.password === formData.confirmPassword &&
                    formData.confirmPassword.length > 0
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                />
                <span
                  className={
                    formData.password === formData.confirmPassword &&
                    formData.confirmPassword.length > 0
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }
                >
                  Passwords match
                </span>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500"
                required
              />
              <span className="text-sm text-slate-400">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
