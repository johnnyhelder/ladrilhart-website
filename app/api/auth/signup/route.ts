import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createOrUpdateProfile } from '@/lib/auth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // Criar perfil
    await createOrUpdateProfile(
      authData.user.id,
      email,
      'author', // Novos usuários sempre começam como author
      supabaseAdmin
    )

    // Atualizar nome completo se fornecido
    if (fullName) {
      await supabaseAdmin
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', authData.user.id)
    }

    return NextResponse.json({
      message: 'Conta criada com sucesso! Faça login para continuar.',
      userId: authData.user.id
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar conta' },
      { status: 500 }
    )
  }
} 