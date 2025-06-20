import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'site@ladrilhart.com',
      subject: 'Teste LADRILHART',
      html: '<p>Email de teste do site!</p>'
    })

    if (error) {
      return NextResponse.json({ error })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: String(error) })
  }
} 