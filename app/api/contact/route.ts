import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Enviar email
    const result = await sendContactEmail(body)
    
    if (!result.success) {
      console.error('Erro ao enviar email:', result.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro na API de contato:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
} 