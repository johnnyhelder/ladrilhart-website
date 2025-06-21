import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const userEmail = request.cookies.get('user-email')?.value
  const userRole = request.cookies.get('user-role')?.value

  // Rotas que precisam de autenticação
  const protectedPaths = ['/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !userEmail) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verificar permissões para rotas admin
  if (request.nextUrl.pathname.startsWith('/admin/users') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 