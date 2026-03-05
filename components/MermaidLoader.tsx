'use client'

import { useEffect, useState } from 'react'

export default function MermaidLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 检查是否已加载
    if ((window as any).mermaid) {
      setLoaded(true)
      return
    }

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
          fontFamily: 'Inter, system-ui, sans-serif',
        })
        setLoaded(true)
      }
    }
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src*="mermaid"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  // 渲染图表
  useEffect(() => {
    if (!loaded || typeof window === 'undefined') return

    const renderCharts = () => {
      const elements = document.querySelectorAll('pre code.language-mermaid')
      elements.forEach((el) => {
        const preEl = el.parentElement
        if (!preEl) return

        // 创建容器
        const container = document.createElement('div')
        container.className = 'mermaid-render my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-x-auto'
        container.style.minWidth = '100%'
        
        // 获取原始代码
        const code = el.textContent || ''
        
        // 替换 pre 标签
        preEl.parentNode?.replaceChild(container, preEl)
        
        // 设置内容并渲染
        container.textContent = code
        
        // 使用 mermaid.render 渲染
        try {
          const mermaid = (window as any).mermaid
          const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
          
          mermaid.render(id, code).then((result: { svg: string }) => {
            container.innerHTML = result.svg
            container.classList.add('flex', 'justify-center')
          }).catch((error: any) => {
            console.error('Mermaid render error:', error)
            container.innerHTML = `<pre><code>${code}</code></pre>`
          })
        } catch (error) {
          console.error('Mermaid error:', error)
          container.innerHTML = `<pre><code>${code}</code></pre>`
        }
      })
    }

    // 延迟渲染，确保 DOM 已准备好
    setTimeout(renderCharts, 300)
  }, [loaded])

  return null
}
