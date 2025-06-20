import { HeroSection } from '@/components/HeroSection'
import { ContactForm } from '@/components/ContactForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Home, Paintbrush, Wrench, Star, Quote, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const services = [
    {
      icon: Home,
      title: 'Casas de Banho',
      description: 'Remodelação completa com design moderno',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      icon: Paintbrush,
      title: 'Cozinhas',
      description: 'Transformamos sua cozinha em um espaço funcional',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      icon: Wrench,
      title: 'Interiores',
      description: 'Renovação completa de apartamentos e casas',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Projetos Concluídos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Suporte ao Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Visual */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Especialistas em transformar espaços com qualidade e design
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <service.icon className="absolute bottom-4 left-4 h-8 w-8 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="group/btn p-0">
                    Saber mais 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Minimal */}
      <section className="py-20 bg-gray-800 dark:bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8">
              "Transformar espaços é transformar vidas"
            </blockquote>
            <p className="text-xl opacity-90 mb-8">
              Com mais de 10 anos de experiência, a LADRILHART é referência em 
              remodelações de alta qualidade em Lisboa.
            </p>
            <Button size="lg" variant="secondary">
              Conhecer Nossa História
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Clean */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O que dizem nossos clientes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Ana Costa',
                location: 'Chiado',
                text: 'Trabalho impecável! A equipa transformou completamente a nossa casa de banho.',
                rating: 5
              },
              {
                name: 'João Silva',
                location: 'Belém',
                text: 'Profissionalismo do início ao fim. Recomendo sem hesitar!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}, Lisboa</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-900 dark:to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para transformar seu espaço?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Solicite um orçamento gratuito e sem compromisso
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Solicitar Orçamento
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Contact Form - Clean Background */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </main>
  )
} 