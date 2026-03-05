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
          const elements = document.querySelectorAll('pre code.language-mermaid')
          elements.forEach((el) => {
            const container = document.createElement('div')
            container.className = 'mermaid-render my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-x-auto'
            container.style.minWidth = '100%'
            
            // 获取原始代码（不转义）
            const code = el.textContent || ''
            
            // 替换 pre 标签
            const preEl = el.parentElement
            preEl?.parentNode?.replaceChild(container, preEl)
            
            // 设置 mermaid 属性
            container.innerHTML = code
          })
          
          // 重新初始化
          setTimeout(() => {
            ;(window as any).mermaid.run({
              nodes: document.querySelectorAll('.mermaid-render'),
            })
          }, 200)
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
