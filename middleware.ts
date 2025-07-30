import { NextRequest, NextResponse } from 'next/server'
import { Role } from '@/schemas/role'

/**
 * =============================================
 *  Authorization / Subscription Middleware
 * =============================================
 *  – Decodes a JWT (assumed stored in `token` cookie) to read
 *    `role` (manager | shipholder | technician) and optional `plan`.
 *  – Blocks access to disallowed paths based on role or subscription plan.
 *  – Redirects to `/unauthorized` (403) or `/upgrade` (402) when needed.
 *
 *  NOTE: Adjust `roleForbidden` and `planForbidden` below as your app grows.
 */

/**
 * Path patterns (RegExp) each role is NOT allowed to access.
 * If a role is missing from the map, it has full access.
 */
const roleForbidden: Record<Role, RegExp[]> = {
  [Role.Manager]: [], // managers can reach everything
  [Role.Shipholder]: [/^\/admin/, /^\/manager/, /^\/technician/],
  [Role.Technician]: [/^\/admin/, /^\/manager/, /^\/shipowner/],
}

/**
 * Path patterns (RegExp) blocked for specific subscription plans.
 * Key should match the `plan` field of the user payload (string).
 * Example: Free / Basic / Pro …
 */
const planForbidden: Record<string, RegExp[]> = {
  Free: [/^\/premium/],
  Basic: [/^\/premium/],
  // Pro: []  // etc.
}

// Public paths that never require auth
const PUBLIC_PATHS = [
  /^\/$/, // landing page
  /^\/login/,
  /^\/create-account/,
  /^\/signup/,
  /^\/api\/public/, // any other public APIs
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public paths and API routes
  if (PUBLIC_PATHS.some((re) => re.test(pathname)) || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verify token with backend using /users/me
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const userResponse = await fetch(`${apiUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    // If token is invalid, redirect to login
    if (!userResponse.ok) {
      const loginUrl = new URL('/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      
      // Clear invalid token
      response.cookies.delete('auth_token')
      response.cookies.delete('auth_user')
      
      return response
    }

    const userData = await userResponse.json()
    
    // Map backend role to frontend role for access control
    const BACKEND_TO_FRONTEND_ROLE: Record<string, Role> = {
      'MANAGER': Role.Manager,
      'SHIPHOLDER': Role.Shipholder,
      'SHIPOWNER': Role.Shipholder,
      'TECHNICIAN': Role.Technician,
    }
    
    const userRole = BACKEND_TO_FRONTEND_ROLE[userData.role] || Role.Technician

    // Check role-based access
    if (roleForbidden[userRole]) {
      const forbidden = roleForbidden[userRole].some((pattern) => pattern.test(pathname))
      if (forbidden) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    return NextResponse.next()

  } catch (error) {
    // If there's an error verifying with backend, redirect to login
    console.error('Middleware auth error:', error)
    const loginUrl = new URL('/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    
    // Clear potentially invalid token
    response.cookies.delete('auth_token')
    response.cookies.delete('auth_user')
    
    return response
  }
}

/**
 * Decodes a JWT and returns its payload without verifying the signature.
 * Works in the Edge runtime using `atob`.
 */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

// Apply to all routes except _next/static & public files automatically
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.\w+$).*)'],
}
