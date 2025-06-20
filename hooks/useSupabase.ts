import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Contact = Database['public']['Tables']['contacts']['Row']
type Post = Database['public']['Tables']['posts']['Row']
type Project = Database['public']['Tables']['portfolio_projects']['Row']

// Hook para buscar projetos do portfólio
export function usePortfolioProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('order_index', { ascending: true })

        if (error) throw error
        setProjects(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

// Hook para buscar posts do blog
export function useBlogPosts(status: 'published' | 'all' = 'published') {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from('posts')
          .select('*')
          .order('published_at', { ascending: false })

        if (status === 'published') {
          query = query.eq('status', 'published')
        }

        const { data, error } = await query

        if (error) throw error
        setPosts(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [status])

  return { posts, loading, error }
}

// Hook para salvar contato
export function useContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  const submitContact = async (data: {
    name: string
    email: string
    phone?: string
    message: string
  }) => {
    console.log('useSupabase - submitContact chamado:', data)
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Apenas salva no Supabase por enquanto
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([data])

      if (dbError) throw dbError

      // Enviar email de notificação
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        
        if (!response.ok) {
          console.error('Erro ao enviar email')
        }
      } catch (emailError) {
        console.error('Erro ao enviar notificação por email:', emailError)
      }

      console.log('Contato salvo com sucesso!')
      setSuccess(true)
      return { success: true }
    } catch (err) {
      setError(err as Error)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return { submitContact, loading, error, success }
}
