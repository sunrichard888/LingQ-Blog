export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">关于我</h1>
      
      <div className="prose prose-lg">
        <p className="text-lg text-gray-600 leading-relaxed">
          你好，我是乔 👋
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          欢迎来到我的个人博客！这里我会分享技术心得、生活感悟和各种有趣的想法。
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">关于这个博客</h2>
        <p className="text-gray-700 leading-relaxed">
          这个博客使用 Next.js 14 和 Tailwind CSS 构建，追求简洁、快速和美观。
          所有文章都使用 Markdown 编写，支持图文混排。
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">联系我</h2>
        <p className="text-gray-700 leading-relaxed">
          如果你有任何问题或想法，欢迎通过以下方式联系我：
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
          <li>Email: your-email@example.com</li>
          <li>GitHub: <a href="https://github.com" className="text-primary-600 hover:underline">@your-username</a></li>
          <li>Twitter: <a href="https://twitter.com" className="text-primary-600 hover:underline">@your-username</a></li>
        </ul>
      </div>
    </div>
  )
}

import Link from 'next/link'
