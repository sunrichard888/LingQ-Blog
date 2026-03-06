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

      return {
        slug,
        title: matterResult.data.title || '无标题',
        date: matterResult.data.date || '未知日期',
        description: matterResult.data.description || '',
        coverImage: matterResult.data.coverImage || null,
      }
    })

  // 按文件修改时间排序（新修改的在前，精确到毫秒）
  return allPostsData.sort((a, b) => {
    const fullPathA = path.join(postsDirectory, `${a.slug}.md`)
    const fullPathB = path.join(postsDirectory, `${b.slug}.md`)
    const statA = fs.statSync(fullPathA)
    const statB = fs.statSync(fullPathB)
    return statB.mtimeMs - statA.mtimeMs
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

  return {
    slug,
    title: matterResult.data.title || '无标题',
    date: matterResult.data.date || '未知日期',
    description: matterResult.data.description || '',
    coverImage: matterResult.data.coverImage || null,
    contentHtml,
  }
}
