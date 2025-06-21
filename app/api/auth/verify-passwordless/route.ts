import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyOTP } from '@/lib/auth'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()
    console.log('Verificando código para:', email, 'código:', code)

    // Verificar OTP
    const { valid, error } = await verifyOTP(email, code, supabaseAdmin)

    if (!valid) {
      console.log('Código inválido:', error)
      return NextResponse.json(
        { error: error || 'Código inválido' },
        { status: 400 }
      )
    }

    console.log('Código válido! Buscando perfil...')

    // Buscar perfil do usuário
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Perfil não encontrado' },
        { status: 404 }
      )
    }

    console.log('Perfil encontrado:', profile.email, profile.role)

    // Criar cookies de sessão simples
    const cookieStore = await cookies()
    
    cookieStore.set('user-email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })
    
    cookieStore.set('user-id', profile.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })
    
    cookieStore.set('user-role', profile.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    console.log('Login bem-sucedido!')

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      role: profile.role
    })

  } catch (error: any) {
    console.error('Erro completo:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar código: ' + error.message },
      { status: 500 }
    )
  }
} 