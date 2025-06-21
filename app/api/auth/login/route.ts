import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createOTP, sendOTPEmail } from '@/lib/auth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('1. Login attempt for:', email)

    // Verificar credenciais
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      console.log('2. Auth error:', authError.message)
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    console.log('3. Auth successful, user ID:', authData.user?.id)

    try {
      // Gerar e enviar OTP
      const code = await createOTP(email, supabaseAdmin)
      console.log('4. OTP created:', code)
      
      await sendOTPEmail(email, code)
      console.log('5. OTP email sent successfully')
    } catch (otpError: any) {
      console.error('6. OTP/Email error:', otpError)
      throw otpError
    }

    // Retornar token temporário
    return NextResponse.json({
      message: 'Código de verificação enviado para seu email',
      tempToken: authData.session?.access_token,
      userId: authData.user?.id,
      email: email // Adicionar email para o componente OTP
    })

  } catch (error: any) {
    console.error('7. Login error details:', error)
    return NextResponse.json(
      { error: 'Erro ao processar login: ' + error.message },
      { status: 500 }
    )
  }
} 