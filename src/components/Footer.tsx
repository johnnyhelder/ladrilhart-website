import { Phone, Mail, MapPin, Instagram, Camera, Linkedin } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo color="white" className="mb-4" />
            <p className="text-gray-400 mb-4">
              Fundada por Bruno Miranda, especialista em remodelação de casas de banho em Lisboa.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded hover:opacity-80 transition-opacity">
                <Instagram size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded hover:opacity-80 transition-opacity">
                <Camera size={20} />
              </button>
              <button className="bg-blue-600 p-2 rounded hover:opacity-80 transition-opacity">
                <Linkedin size={20} />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Remodelação de Casas de Banho</li>
              <li>Reformas Gerais</li>
              <li>Consultoria e Projeto</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre Nós</li>
              <li>Portfólio</li>
              <li>Blog</li>
              <li>Contactos</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <div>+351 965 414 792</div>
              <div>info@ladrilhart.pt</div>
              <div>Lisboa, Portugal</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 LADRILHART - Bruno Miranda. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Eficiência, clareza, confiança e elegância com um toque de modernidade.</p>
        </div>
      </div>
    </footer>
  )
}
