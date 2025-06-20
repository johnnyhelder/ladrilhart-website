'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Formulário enviado! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Solicitar Orçamento
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Nome Completo
          </label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Email
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Telefone
          </label>
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+351 965 414 792"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Descrição do Projeto
          </label>
          <textarea 
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva o seu projeto de remodelação..."
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-900 dark:bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
        >
          Enviar Solicitação
        </button>
      </form>
    </div>
  )
}
