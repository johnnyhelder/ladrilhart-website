import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    
    console.log('Tentando enviar email...')
    console.log('API Key existe:', !!process.env.RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
      from: 'LADRILHART <noreply@ladrilhart.com>',
      to: 'site@ladrilhart.com',
      subject: 'Teste Direto - ' + new Date().toLocaleTimeString(),
      html: '<p>Este é um teste direto do Resend. Se você recebeu este email, o Resend está funcionando!</p>'
    })

    if (error) {
      console.error('Erro Resend:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    console.log('Email enviado:', data)
    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Email enviado! Verifique site@ladrilhart.com'
    })

  } catch (error: any) {
    console.error('Erro:', error)
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
} 