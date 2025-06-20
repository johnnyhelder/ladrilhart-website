import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface ContactEmailProps {
  name: string
  email: string
  phone?: string
  message: string
}

export async function sendContactEmail({ name, email, phone, message }: ContactEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'LADRILHART <onboarding@resend.dev>',
      to: 'site@ladrilhart.com',
      subject: `Novo Contato: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Novo Contato do Site</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
            <p><strong>Mensagem:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 3px solid #0066cc; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Este email foi enviado automaticamente pelo formulário de contato do site.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error }
  }
} 