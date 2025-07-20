"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Anchor, Ship, Waves } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../_providers/auth"
import { Role } from "@/schemas/role"

export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError("")

    if (!email || !password) {
      setLocalError("Please fill in all fields")
      return
    }

    try {
      const user = await login(email, password)
      // Successful login - redirect based on user role
      if (user) {
        switch (user.role) {
          case Role.Manager:
            router.push('/manager')
            break
          case Role.Shipholder:
            router.push('/shipowner')
            break
          case Role.Technician:
            router.push('/technician')
            break
          default:
            router.push('/manager') // fallback
        }
      }
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  const displayError = localError || error

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("/cargo-ship.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/60 to-slate-800/90" />
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <Image src="/logo.png" alt="WaterLog" width={64} height={64} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">WaterLog</h1>
          <p className="text-blue-200">Fleet Water Management System</p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Sign in to access your fleet dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Error Display */}
              {displayError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                  <p className="text-red-300 text-sm">{displayError}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="text-slate-200">
                  <span className="text-sm font-medium leading-none">Email Address</span>
                </div>
                <Input
                  type="email"
                  placeholder="captain@shipping.com"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="text-slate-200">
                  <span className="text-sm font-medium leading-none">Password</span>
                </div>
                <Input
                  type="password"
                  className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      disabled={loading}
                    />
                    <span className="text-sm text-slate-300">Remember me</span>
                  </div>
                </div>
                <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto" disabled={loading}>
                  Forgot password?
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing In...
                  </div>
                ) : (
                  <>
                    <Anchor className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center space-x-1 text-sm text-slate-400">
                <span>Don't have an account?</span>
                <Link href="/create-account" className="text-blue-400 hover:text-blue-300">
                  Register
                </Link>
              </div>
              <div className="text-center text-sm text-slate-400">Need access? Contact your fleet administrator</div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-slate-400 mb-2">
            <Waves className="w-4 h-4 mr-2" />
            <span className="text-sm">Secure Maritime Operations Platform</span>
          </div>
          <p className="text-xs text-slate-500">© 2024 Water Log. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
} 