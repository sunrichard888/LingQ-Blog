import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

const MermaidLoader = dynamic(() => import('@/components/MermaidLoader'), {
  ssr: false,
})
const Logo = dynamic(() => import('@/components/Logo'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'LingQ Blog - 乔的博客',
  description: '一个美观现代的个人博客系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <MermaidLoader />
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Logo />
            <div className="flex gap-6">
              <a href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">
                博客
              </a>
              <a href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
                关于
              </a>
            </div>
          </nav>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 LingQ Blog. Built with Next.js & Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  )
}
