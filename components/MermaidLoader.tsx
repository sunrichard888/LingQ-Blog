'use client'

import { useEffect } from 'react'

export default function MermaidLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 加载 mermaid CDN
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
    script.async = true
    script.onload = () => {
      if ((window as any).mermaid) {
        (window as any).mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        })
        
        // 渲染所有 mermaid 图表
        setTimeout(() => {
          const elements = document.querySelectorAll('.language-mermaid')
          elements.forEach((el, index) => {
            const container = document.createElement('div')
            container.className = 'mermaid-render my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-x-auto'
            container.style.minWidth = '100%'
            
            const code = el.textContent || ''
            container.setAttribute('data-mermaid', code)
            
            el.parentNode?.parentNode?.replaceChild(container, el.parentNode)
          })
          
          // 重新初始化
          ;(window as any).mermaid.run({
            nodes: document.querySelectorAll('.mermaid-render'),
          })
        }, 100)
      }
    }
    document.head.appendChild(script)

    return () => {
      // 清理
      const existingScript = document.querySelector('script[src*="mermaid"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null
}
