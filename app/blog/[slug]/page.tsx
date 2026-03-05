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
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  )
}

import Link from 'next/link'
