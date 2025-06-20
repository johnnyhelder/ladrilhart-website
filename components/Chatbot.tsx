'use client'
import { useState } from 'react'
import { MessageCircle, X, ArrowRight } from 'lucide-react'

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Olá! Sou o assistente virtual da LADRILHART, empresa do Bruno Miranda. Posso tirar alguma dúvida sobre nossos serviços?' }
  ])
  const [chatInput, setChatInput] = useState('')

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return

    const userMessage = { type: 'user', text: chatInput }
    setChatMessages(prev => [...prev, userMessage])

    setTimeout(() => {
      let botResponse = "Obrigado pela sua pergunta! Para informações mais específicas, por favor contacte-nos diretamente."
      
      if (chatInput.toLowerCase().includes('serviços') || chatInput.toLowerCase().includes('obras')) {
        botResponse = "Oferecemos 3 serviços principais:\n\n• Remodelação de Casas de Banho (nossa especialidade)\n• Reformas Gerais\n• Consultoria & Projeto\n\nTrabalhamos desde o design até a finalização da obra."
      } else if (chatInput.toLowerCase().includes('orçamento') || chatInput.toLowerCase().includes('preço')) {
        botResponse = "Para um orçamento personalizado, pode preencher nosso formulário de contato ou ligar-nos. Cada projeto é único e calculamos o valor baseado nas suas necessidades específicas."
      } else if (chatInput.toLowerCase().includes('área') || chatInput.toLowerCase().includes('lisboa')) {
        botResponse = "Atuamos principalmente em Lisboa e região metropolitana. Contacte-nos para confirmar se atendemos a sua área."
      } else if (chatInput.toLowerCase().includes('bruno') || chatInput.toLowerCase().includes('fundador')) {
        botResponse = "Bruno Miranda é o fundador da LADRILHART, com mais de 10 anos de experiência em remodelações. Ele acompanha pessoalmente todos os projetos para garantir a máxima qualidade."
      }

      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    }, 1000)

    setChatInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-80 h-96 flex flex-col">
          <div className="bg-blue-900 dark:bg-blue-800 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-semibold">Assistente LADRILHART</span>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                  message.type === 'user' 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <button 
                onClick={handleChatSubmit}
                className="bg-blue-900 dark:bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setChatOpen(true)}
          className="bg-blue-900 dark:bg-blue-800 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  )
}
