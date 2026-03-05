import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const featuredPosts = allPostsData.slice(0, 3)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          欢迎来到 LingQ Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          乔的个人博客 - 分享技术、生活与思考
        </p>
        <Link 
          href="/blog"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
        >
          开始阅读 →
        </Link>
      </section>

      {/* Featured Posts */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">最新文章</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                {post.coverImage ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          想要了解更多？
        </h2>
        <Link 
          href="/blog"
          className="inline-block bg-white text-primary-600 px-6 py-2 rounded-full font-medium hover:shadow-md transition-all border border-primary-200"
        >
          查看全部文章
        </Link>
      </section>
    </div>
  )
}
