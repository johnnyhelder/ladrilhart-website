import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('user-email')?.value
    const userRole = cookieStore.get('user-role')?.value

    if (!userEmail) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar o ID do usuário
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Buscar posts baseado no role
    let query = supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    // Se não for admin, mostrar apenas os próprios posts
    if (userRole !== 'admin') {
      query = query.eq('author_id', profile.id)
    }

    const { data: posts, error } = await query

    if (error) throw error

    return NextResponse.json(posts || [])

  } catch (error: any) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('user-email')?.value
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar perfil do usuário
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Obter dados do post
    const body = await request.json()
    const { title, slug, content, excerpt, status } = body

    // Definir published_at se o status for published
    const published_at = status === 'published' ? new Date().toISOString() : null

    // Criar o post
    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        status,
        author_id: profile.id,
        published_at
      })
      .select()
      .single()

    if (error) {
      // Se for erro de slug duplicado
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Já existe um post com essa URL (slug)' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(post)

  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    )
  }
} 