import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
