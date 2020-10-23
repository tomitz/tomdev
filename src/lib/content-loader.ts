import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import { formatDate } from '@lib/date'

const DIR = path.join(process.cwd(), 'articles')
const EXTENSION = '.md'

/**
 * Markdown のファイル一覧を取得する
 */
const listContentFiles = () => {
  const filenames = fs.readdirSync(DIR)
  return filenames.filter((filename: string) => path.parse(filename).ext === EXTENSION)
}

/**
 * Markdown のファイルの中身をパースして取得する
 */
const readContentFile = async ({ slug }: { slug: string }) => {
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title, published: rawPublished } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()
  return {
    title,
    published: formatDate(rawPublished),
    content,
    slug,
  }
}

export { listContentFiles, readContentFile }
