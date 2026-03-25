import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'

// 配置 marked 使用标题 ID 插件
marked.use(gfmHeadingId())

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getSortedPostsData() {
  // 获取所有文章
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      // gray-matter 会自动将 YYYY-MM-DD 解析为 Date 对象，需要转回字符串
      const rawDate = matterResult.data.date
      let dateStr: string
      if (rawDate instanceof Date) {
        dateStr = rawDate.toISOString().split('T')[0]
      } else {
        dateStr = String(rawDate || '未知日期')
      }

      return {
        slug,
        title: matterResult.data.title || '无标题',
        date: dateStr,
        description: matterResult.data.description || '',
        coverImage: matterResult.data.coverImage || null,
      }
    })

  // 按 frontmatter 中的 date 字段排序（新文章在前）
  // 日期格式：YYYY-MM-DD
  return allPostsData.sort((a, b) => {
    return b.date.localeCompare(a.date)
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  // 使用 marked 将 Markdown 转换为 HTML（支持图片、表格等）
  const contentHtml = await marked(matterResult.content)

  // gray-matter 会自动将 YYYY-MM-DD 解析为 Date 对象，需要转回字符串
  const rawDate = matterResult.data.date
  let dateStr: string
  if (rawDate instanceof Date) {
    dateStr = rawDate.toISOString().split('T')[0]
  } else {
    dateStr = String(rawDate || '未知日期')
  }

  return {
    slug,
    title: matterResult.data.title || '无标题',
    date: dateStr,
    description: matterResult.data.description || '',
    coverImage: matterResult.data.coverImage || null,
    contentHtml,
  }
}

export type PostData = ReturnType<typeof getPostData> extends Promise<infer T> ? T : never
