"use client"

import { PasswordlessLogin } from '@/components/auth/passwordless-login'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <PasswordlessLogin />
    </div>
  )
} 