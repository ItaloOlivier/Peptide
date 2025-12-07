'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Beaker, Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
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

          <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to your account to continue
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
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In
            </Button>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <p className="text-xs text-slate-400 text-center mb-2">Demo credentials:</p>
              <p className="text-xs text-slate-300 text-center font-mono">
                demo@peptide.app / demo123
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
