import { getPostData, getAllPostSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  if (!postData) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Link href="/blog" className="text-primary-600 hover:underline text-sm mb-4 inline-block">
          ← 返回博客列表
        </Link>
        <time className="text-gray-500">{postData.date}</time>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
          {postData.title}
        </h1>
        {postData.description && (
          <p className="text-xl text-gray-600">
            {postData.description}
          </p>
        )}
        {postData.coverImage && (
          <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={postData.coverImage} 
              alt={postData.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </header>

      <div 
        className="prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:italic prose-blockquote:text-gray-600
          prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
          prose-img:rounded-lg prose-img:shadow-md
          prose-table:border prose-table:border-collapse
          prose-th:border prose-th:bg-gray-50 prose-th:p-2
          prose-td:border prose-td:p-2
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  )
}
