import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  // Teste 1: Buscar um post com suas categorias
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      post_categories (
        category_id,
        categories (
          id,
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .limit(1)

  // Teste 2: Buscar diretamente as relações
  const { data: relations } = await supabase
    .from('post_categories')
    .select('*')
    .limit(5)

  return NextResponse.json({
    posts,
    relations,
    error
  })
} 