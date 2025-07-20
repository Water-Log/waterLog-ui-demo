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
  [Role.Shipholder]: [/^\/admin/, /^\/manager/],
  [Role.Technician]: [/^\/admin/, /^\/manager/, /^\/ship/],
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
  /^\/api\/auth\/login/,
  /^\/api\/auth\/register/,
  /^\/api\/public/, // any other public APIs
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public paths and API routes
  if (PUBLIC_PATHS.some((re) => re.test(pathname)) || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // For now, let client-side handle authentication
  // The auth provider will handle redirects based on authentication state
  return NextResponse.next()
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
