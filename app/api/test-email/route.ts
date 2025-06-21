import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function GET() {
  try {
    console.log('Testing Resend configuration...')
    console.log('API Key present:', !!process.env.RESEND_API_KEY)
    console.log('API Key length:', process.env.RESEND_API_KEY?.length || 0)

    const { data, error } = await resend.emails.send({
      from: 'LADRILHART <onboarding@resend.dev>',
      to: 'test@example.com', // Email de teste
      subject: 'Teste de configuração',
      html: '<p>Este é um email de teste</p>'
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ 
        error: error.message || error,
        apiKeyPresent: !!process.env.RESEND_API_KEY
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      data,
      apiKeyPresent: !!process.env.RESEND_API_KEY
    })

  } catch (error: any) {
    console.error('Caught error:', error)
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      apiKeyPresent: !!process.env.RESEND_API_KEY,
      errorType: error.constructor.name
    }, { status: 500 })
  }
} 