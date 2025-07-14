import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Anchor, Ship, Waves } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

export default function LoginPage() {
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-slate-200">
                <span className="text-sm font-medium leading-none">Email Address</span>
              </div>
              <Input
                type="email"
                placeholder="captain@shipping.com"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="text-slate-200">
                <span className="text-sm font-medium leading-none">Password</span>
              </div>
              <Input
                type="password"
                className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm text-slate-300">Remember me</span>
                </div>
              </div>
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                Forgot password?
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Anchor className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <div className="flex items-center justify-center space-x-1 text-sm text-slate-400">
              <span>Don't have an account?</span>
              <Link href="/register" className="text-blue-400 hover:text-blue-300">
                Register
              </Link>
            </div>
            <div className="text-center text-sm text-slate-400">Need access? Contact your fleet administrator</div>
          </CardFooter>
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