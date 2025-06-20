import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import ContactForm from '../components/ContactForm'
import { Phone, Mail, MapPin, Star, Calendar, CheckCircle, ArrowRight, Camera } from 'lucide-react'

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const services = [
    {
      title: "Remodelação de Casas de Banho",
      description: "Transformação completa com design moderno e funcional",
      icon: "🛁"
    },
    {
      title: "Reformas Gerais", 
      description: "Projetos completos de remodelação de interiores",
      icon: "🔨"
    },
    {
      title: "Consultoria e Projeto",
      description: "Acompanhamento desde a concepção até a execução",
      icon: "📐"
    }
  ]

  const testimonials = [
    {
      name: "Ana Costa",
      location: "Chiado, Lisboa",
      text: "O Bruno e a sua equipa transformaram completamente a nossa casa de banho! Trabalho impecável e acabamentos de alta qualidade.",
      rating: 5
    },
    {
      name: "João Silva", 
      location: "Príncipe Real, Lisboa",
      text: "Profissionais excelentes, o Bruno cumpriu todos os prazos e o resultado superou as expectativas. Recomendo vivamente!",
      rating: 5
    },
    {
      name: "Maria Santos",
      location: "Cascais", 
      text: "O acompanhamento pessoal do Bruno fez toda a diferença. Atenção aos detalhes e atendimento personalizado excecional.",
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Head>
        <title>LADRILHART - Especialistas em Remodelação de Casas de Banho em Lisboa</title>
        <meta name="description" content="Bruno Miranda e a LADRILHART transformam casas de banho em Lisboa há mais de 10 anos. Projetos personalizados, qualidade superior e acompanhamento profissional." />
      </Head>

      {/* Hero Section */}
      <section id="inicio" className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transformamos <span className="text-blue-900 dark:text-blue-400">Casas de Banho</span> em Lisboa
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Fundada por Bruno Miranda, especialista em remodelações com mais de 10 anos de experiência. 
              Projetos completos desde o design até à execução final, com acompanhamento personalizado.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              "Transformar espaços é transformar vidas" - Bruno Miranda
            </p>
            <button className="bg-blue-900 dark:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors flex items-center mx-auto">
              Solicitar Orçamento Gratuito
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200 dark:text-blue-300">Projetos Concluídos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-200 dark:text-blue-300">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200 dark:text-blue-300">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-blue-200 dark:text-blue-300">Suporte Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Conheça Bruno Miranda
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Fundador da LADRILHART, Bruno Miranda possui mais de uma década de experiência 
                especializada em remodelações de casas de banho e reformas gerais em Lisboa e região.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Com formação técnica e paixão pela excelência, Bruno construiu a LADRILHART 
                baseando-se em princípios de qualidade superior, pontualidade e atendimento 
                personalizado. Cada projeto é acompanhado pessoalmente por ele, garantindo 
                que os mais altos padrões sejam mantidos.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 italic">
                "Transformar espaços é transformar vidas. Cada casa de banho que remodelamos 
                não é apenas uma obra, é o sonho de uma família tornando-se realidade." 
                - Bruno Miranda
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">Acompanhamento Pessoal</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">10+ Anos Experiência</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-blue-900 dark:bg-blue-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">👨‍💼</span>
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-white">Bruno Miranda</div>
                  <div className="text-blue-700 dark:text-blue-300">Fundador & Especialista</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Serviços
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Oferecemos soluções completas de remodelação com foco na qualidade 
              e satisfação do cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-900 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Dizem os Nossos Clientes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 dark:bg-white/5 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="text-lg font-semibold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-blue-200 dark:text-blue-300">
                {testimonials[currentTestimonial].location}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contacte-nos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pronto para transformar sua casa de banho? Entre em contato connosco 
              para um orçamento personalizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="text-blue-900 dark:text-blue-400 mr-3" size={20} />
                    <span className="text-black dark:text-white font-bold">+351 965 414 792</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-blue-900 dark:text-blue-400 mr-3" size={20} />
                    <span className="text-black dark:text-white font-bold">info@ladrilhart.pt</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-blue-900 dark:text-blue-400 mr-3" size={20} />
                    <span className="text-black dark:text-white font-bold">Lisboa, Portugal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Horários de Atendimento
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta:</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span>09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
