import React from 'react'
import path from 'path'
import Layout from '@components/Layout'
import { readContentFile, listContentFiles } from '@lib/content-loader'

const Article = (params: { title: string; published: string; content: string }): JSX.Element => {
  return (
    <Layout title={params.title}>
      <div className="post-meta">
        <span>{params.published}</span>
      </div>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: params.content }} />
    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const content = await readContentFile({ slug: params.slug })

  return {
    props: {
      ...content,
    },
  }
}

/**
 * 有効な URL パラメータを全件返す
 */
export const getStaticPaths = async () => {
  const paths = listContentFiles().map((filename: string) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }))

  return { paths, fallback: false }
}

export default Article
