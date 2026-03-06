import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Logo 图标 */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* 外圈 - 渐变圆环 */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="transform group-hover:rotate-12 transition-transform duration-300"
        >
          {/* 背景圆 */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            className="fill-gradient-to-br from-blue-500 to-purple-600"
            fill="url(#logoGradient)"
          />
          
          {/* 渐变定义 */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* 字母 L - 白色 */}
          <path 
            d="M 12 10 L 12 28 L 16 28 L 16 14 L 22 14 L 22 10 Z" 
            className="fill-white"
            fill="#FFFFFF"
          />
          
          {/* 字母 Q - 白色，带尾巴 */}
          <circle 
            cx="28" 
            cy="18" 
            r="6" 
            className="fill-none stroke-white stroke-2"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <line 
            x1="31" 
            y1="21" 
            x2="34" 
            y2="24" 
            className="stroke-white stroke-2 stroke-linecap-round"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* 文字标识 */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-none">
          LingQ
        </span>
        <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors leading-none mt-0.5">
          Blog
        </span>
      </div>
    </Link>
  )
}
