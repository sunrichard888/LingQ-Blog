'use client'

import Image from 'next/image'

export default function Profile() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sunrichard888',
      icon: '/icons/social/github.svg',
      color: 'hover:bg-gray-100'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/richard91261848',
      icon: '/icons/social/twitter.svg',
      color: 'hover:bg-blue-50'
    },
    {
      name: 'Email',
      url: 'mailto:sun.richard888@gmail.com',
      icon: '/icons/social/email.svg',
      color: 'hover:bg-red-50'
    },
    {
      name: '小红书',
      url: '#',
      icon: '/icons/social/xiaohongshu.svg',
      color: 'hover:bg-red-50'
    },
    {
      name: '抖音',
      url: '#',
      icon: '/icons/social/tiktok.svg',
      color: 'hover:bg-gray-100'
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
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('http') && !link.url.startsWith('mailto') ? '_blank' : undefined}
            rel={link.url.startsWith('http') && !link.url.startsWith('mailto') ? 'noopener noreferrer' : undefined}
            className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${link.color}`}
            title={link.name}
          >
            <Image
              src={link.icon}
              alt={link.name}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
        ))}
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
