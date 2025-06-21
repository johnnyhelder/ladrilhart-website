"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, Eye, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalUsers: 1,
    totalViews: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Por enquanto, usar dados mock
    // TODO: Implementar carregamento real quando corrigir Supabase
    setTimeout(() => {
      setStats({
        totalPosts: 0,
        publishedPosts: 0,
        totalUsers: 1,
        totalViews: 0
      })
      setLoading(false)
    }, 500)
  }, [])

  const statsCards = [
    {
      title: 'Total de Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: `${stats.publishedPosts} publicados`
    },
    {
      title: 'Usuários',
      value: stats.totalUsers,
      icon: Users,
      description: 'Autores e administradores'
    },
    {
      title: 'Visualizações',
      value: stats.totalViews,
      icon: Eye,
      description: 'Últimos 30 dias'
    },
    {
      title: 'Engajamento',
      value: '+12%',
      icon: TrendingUp,
      description: 'Comparado ao mês anterior'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu blog
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use o menu lateral para navegar entre as seções:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• <strong>Posts:</strong> Criar e gerenciar artigos do blog</li>
            <li>• <strong>Categorias:</strong> Organizar conteúdo por temas</li>
            <li>• <strong>Usuários:</strong> Gerenciar autores e administradores</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 