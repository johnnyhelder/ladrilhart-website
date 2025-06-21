import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createOTP, sendOTPEmail } from '@/lib/auth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    console.log('Passwordless login request for:', email)

    // Verificar se o usuário existe
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id, role')
      .eq('email', email)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Email não cadastrado' },
        { status: 404 }
      )
    }

    // Gerar e enviar OTP
    const code = await createOTP(email, supabaseAdmin)
    console.log('OTP gerado:', code)
    
    // Por enquanto, mostrar no console também
    console.log('\n=================================')
    console.log('🔐 CÓDIGO DE ACESSO')
    console.log(`Email: ${email}`)
    console.log(`Código: ${code}`)
    console.log('=================================\n')
    
    try {
      await sendOTPEmail(email, code)
      console.log('Email enviado com sucesso')
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      // Continuar mesmo se o email falhar em desenvolvimento
    }

    return NextResponse.json({
      message: 'Código de acesso enviado para seu email',
      userId: profile.id,
      email: email
    })

  } catch (error: any) {
    console.error('Passwordless login error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
} 