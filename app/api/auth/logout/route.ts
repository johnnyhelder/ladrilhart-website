import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()
  
  // Remover cookie de autenticação
  cookieStore.delete('supabase-auth-token')
  
  return NextResponse.json({ message: 'Logout realizado com sucesso' })
} 