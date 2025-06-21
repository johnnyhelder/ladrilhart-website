import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET - Buscar post por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('user-email')?.value
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
    }

    return NextResponse.json(post)

  } catch (error: any) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar post' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('user-email')?.value
    const userRole = cookieStore.get('user-role')?.value
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar o post existente
    const { data: existingPost } = await supabaseAdmin
      .from('posts')
      .select('author_id, published_at')
      .eq('id', params.id)
      .single()

    if (!existingPost) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
    }

    // Verificar permissão (admin ou autor do post)
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userRole !== 'admin' && existingPost.author_id !== profile?.id) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }

    // Atualizar o post
    const body = await request.json()
    const { title, slug, content, excerpt, status } = body

    // Atualizar published_at se mudou para published
    const updateData: any = {
      title,
      slug,
      content,
      excerpt,
      status,
      updated_at: new Date().toISOString()
    }

    // Se mudou para published e não tinha published_at
    if (status === 'published' && !existingPost.published_at) {
      updateData.published_at = new Date().toISOString()
    }

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
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
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar post' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('user-email')?.value
    const userRole = cookieStore.get('user-role')?.value
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Apenas admins podem deletar
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }

    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ message: 'Post deletado com sucesso' })

  } catch (error: any) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar post' },
      { status: 500 }
    )
  }
} 