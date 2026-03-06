'use client'

import { 
  FaGithub, 
  FaTwitter, 
  FaEnvelope,
  FaTiktok,
  FaInstagram 
} from 'react-icons/fa6'

export default function Profile() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sunrichard888',
      icon: FaGithub,
      color: 'hover:text-gray-900'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/richard91261848',
      icon: FaTwitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:sun.richard888@gmail.com',
      icon: FaEnvelope,
      color: 'hover:text-red-500'
    },
    {
      name: '小红书',
      url: '#',
      icon: FaInstagram,
      color: 'hover:text-red-600'
    },
    {
      name: '抖音',
      url: '#',
      icon: FaTiktok,
      color: 'hover:text-gray-800'
    }
  ]

  return (
    <div className="text-center">
      {/* 头像 */}
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          乔
        </div>
      </div>

      {/* 个人简介 */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">乔</h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          技术爱好者 · 博客作者 · 终身学习者<br/>
          分享技术心得、生活感悟和各种有趣的想法
        </p>
      </div>

      {/* 社交媒体链接 */}
      <div className="flex justify-center gap-4">
        {socialLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${link.color}`}
              title={link.name}
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}
      </div>

      {/* 版权信息 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2026 LingQ Blog. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </div>
  )
}
