import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  
  // Remover cookies de autenticação
  cookieStore.delete('supabase-auth-token')
  cookieStore.delete('user-email')
  cookieStore.delete('user-id')
  cookieStore.delete('user-role')
  
  return NextResponse.json({ message: 'Logout realizado com sucesso' })
} 