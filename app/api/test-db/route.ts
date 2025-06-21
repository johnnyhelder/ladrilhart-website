import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Testar inserção na tabela otp_codes
    const testOTP = {
      email: 'test@example.com',
      code: '123456',
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('otp_codes')
      .insert(testOTP)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Limpar teste
    if (data && data[0]) {
      await supabaseAdmin
        .from('otp_codes')
        .delete()
        .eq('id', data[0].id)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection working',
      serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    })

  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }, { status: 500 })
  }
} 