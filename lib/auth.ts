import { createClient } from '@supabase/supabase-js'
import { resend } from './resend'

// Gerar código OTP de 6 dígitos
export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Criar e salvar OTP no banco
export async function createOTP(email: string, supabase: any) {
  const code = generateOTPCode()
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 10) // Expira em 10 minutos

  const { error } = await supabase
    .from('otp_codes')
    .insert({
      email,
      code,
      expires_at: expiresAt.toISOString()
    })

  if (error) throw error

  return code
}

// Enviar OTP por email
export async function sendOTPEmail(email: string, code: string) {
  // Em desenvolvimento, mostrar código no console também
  if (process.env.NODE_ENV === 'development') {
    console.log('\n=================================')
    console.log('🔐 CÓDIGO OTP')
    console.log(`Email: ${email}`)
    console.log(`Código: ${code}`)
    console.log('=================================\n')
  }

  const { error } = await resend.emails.send({
    from: 'LADRILHART <noreply@ladrilhart.com>', // Use seu email preferido
    to: email,
    subject: 'Seu código de verificação - LADRILHART',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Código de Verificação</h2>
        <p>Seu código de verificação é:</p>
        <h1 style="background: #f0f0f0; padding: 20px; text-align: center; letter-spacing: 5px;">
          ${code}
        </h1>
        <p>Este código expira em 10 minutos.</p>
        <p style="color: #666; font-size: 14px;">
          Se você não solicitou este código, ignore este email.
        </p>
      </div>
    `
  })

  if (error) throw error
}

// Verificar OTP
export async function verifyOTP(email: string, code: string, supabase: any) {
  const { data, error } = await supabase
    .from('otp_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !data) {
    return { valid: false, error: 'Código inválido ou expirado' }
  }

  // Marcar como usado
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('id', data.id)

  return { valid: true, data }
}

// Criar ou atualizar perfil do usuário
export async function createOrUpdateProfile(userId: string, email: string, role: string, supabase: any) {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email,
      role,
      updated_at: new Date().toISOString()
    })

  if (error) throw error
} 