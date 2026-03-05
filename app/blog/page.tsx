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
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="flex flex-col sm:flex-row">
                {post.coverImage ? (
                  <div className="sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                <div className="flex-1 p-6">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h2 className="text-2xl font-semibold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {post.description}
                  </p>
                </div>
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
