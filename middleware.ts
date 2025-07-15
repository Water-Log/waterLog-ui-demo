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
  /^\/register/,
  /^\/api\/login/,
  /^\/api\/register/,
  /^\/api\/public/, // any other public APIs
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.next();
  }

  // Skip public paths
  if (PUBLIC_PATHS.some((re) => re.test(pathname))) {
    return NextResponse.next()
  }

  // Extract token from cookies – adjust cookie name if you use different
  const token = request.cookies.get('token')?.value

  if (!token) {
    // Not authenticated → redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Decode JWT payload – *no signature verification* (Edge-friendly)
  const payload = decodeJwt(token)
  if (!payload) {
    // Invalid token – clear cookie and send to login
    const res = NextResponse.redirect(new URL('/login', request.url))
    res.cookies.delete('token')
    return res
  }

  const role: Role | undefined = payload.role as Role | undefined
  const plan: string | undefined = payload.plan as string | undefined

  // Role-based restriction
  if (role) {
    const forbiddenPatterns = roleForbidden[role] || []
    const isForbidden = forbiddenPatterns.some((re) => re.test(pathname))
    if (isForbidden) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Plan-based restriction (only if plan present and mapping exists)
  if (plan && planForbidden[plan]) {
    const isForbidden = planForbidden[plan].some((re) => re.test(pathname))
    if (isForbidden) {
      return NextResponse.redirect(new URL('/upgrade', request.url))
    }
  }

  // All good → continue
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
