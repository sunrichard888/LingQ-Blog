import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function BlogPage() {
  const allPostsData = getSortedPostsData()

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">所有文章</h1>
      
      <div className="space-y-6">
        {allPostsData.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h2 className="text-2xl font-semibold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {post.description}
                  </p>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {allPostsData.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">还没有文章，开始创作吧！</p>
        </div>
      )}
    </div>
  )
}
