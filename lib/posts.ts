import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { execSync } from 'child_process'

// 配置 marked 使用标题 ID 插件
marked.use(gfmHeadingId())

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 获取文件的 Git 提交时间（ Unix 时间戳）
function getGitCommitTime(filePath: string): number {
  try {
    const result = execSync(`git log -1 --format=%ct "${filePath}"`, {
      encoding: 'utf-8',
      cwd: process.cwd()
    }).trim()
    return parseInt(result, 10) * 1000 // 转换为毫秒
  } catch (error) {
    // 如果不是 Git 仓库，回退到文件修改时间
    const stat = fs.statSync(filePath)
    return stat.mtimeMs
  }
}

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
        commitTime: getGitCommitTime(fullPath),
      }
    })

  // 按 Git 提交时间排序（新提交在前，精确到秒）
  return allPostsData.sort((a, b) => {
    return b.commitTime - a.commitTime
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

export type PostData = ReturnType<typeof getPostData> extends Promise<infer T> ? T : never
