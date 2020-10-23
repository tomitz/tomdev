import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  title: string
}

const Layout: React.FC<Props> = (props) => {
  const { title, children } = props
  const siteTitle = 'tomdev'

  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="site-title">
          <Link href="/">
            <a>{siteTitle}</a>
          </Link>
        </h1>
      </header>
      <main>
        {title ? <h1 className="page-title">{title}</h1> : ''}
        <div className="page-main">{children}</div>
      </main>
      <footer>&copy; {siteTitle}</footer>
      <style jsx>{`
        .page {
          padding: 2em 1em;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0 4em;
        }
        .site-title a {
          color: inherit;
          text-decoration: none;
        }
        footer {
          margin-top: 4em;
          padding-top: 2em;
          padding-bottom: 2em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default Layout
