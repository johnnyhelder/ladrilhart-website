import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyOTP, createOrUpdateProfile } from '@/lib/auth'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, code, tempToken, userId } = await request.json()

    // Verificar OTP
    const { valid, error } = await verifyOTP(email, code, supabaseAdmin)

    if (!valid) {
      return NextResponse.json(
        { error: error || 'Código inválido' },
        { status: 400 }
      )
    }

    // Buscar dados do usuário
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    // Se não tiver perfil, criar como author
    if (!profile) {
      await createOrUpdateProfile(userId, email, 'author', supabaseAdmin)
    }

    // Definir cookies de sessão
    const cookieStore = cookies()
    cookieStore.set('supabase-auth-token', tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      role: profile?.role || 'author'
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar código' },
      { status: 500 }
    )
  }
} 