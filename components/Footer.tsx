import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Linkedin, MessageCircle } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">LADRIL</span>
              <span className="text-primary">HART</span>
            </h3>
            <p className="text-sm mb-4">
              Especialistas em remodelação de casas de banho e reformas gerais em Lisboa e região.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/351965414792" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-400 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/ladrilhart_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/ladrilhart" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nossos Serviços</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors">Remodelação de Casas de Banho</li>
              <li className="hover:text-white transition-colors">Renovação de Cozinhas</li>
              <li className="hover:text-white transition-colors">Reformas de Interiores</li>
              <li className="hover:text-white transition-colors">Consultoria e Projetos</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+351965414792" className="hover:text-white transition-colors">
                    +351 965 414 792
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:site@ladrilhart.pt" className="hover:text-white transition-colors">
                  site@ladrilhart.pt
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Lisboa, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} LADRILHART. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
