import Head from 'next/head'
import { Blogs } from '~/interfaces'
import axios from 'axios'
import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

interface Props {
  blogs: Array<Blogs>
}

const BlogHome: NextPage<Props> = ({ blogs }) => (
  <>
    <Head>
      <title>blogs</title>
    </Head>

    <h1 className="title">ブログトップ</h1>
    <Link href="/">
      <a className="link">ホームへ</a>
    </Link>
    <div>
      {blogs.map((blog, index) => (
        <div className="item" key={index}>
          <h2 className="item__title">{blog.title}</h2>
          <p className="item__label">{blog.label}</p>
          <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
            <a className="item__link">詳細へ</a>
          </Link>
        </div>
      ))}
    </div>
  </>
)

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData
}): Promise<{
  props: Props
}> => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY }
  }
  const res = await axios.get(process.env.END_POINT + 'blogs/?limit=9999', key)
  const data: Array<Blogs> = await res.data.contents
  // プレビュー時は draft のコンテンツを追加
  if (preview) {
    const draftUrl =
      process.env.END_POINT +
      'blogs/' +
      previewData.id +
      `?draftKey=${previewData.draftKey}`
    const draftRes = await axios.get(draftUrl, key)
    data.unshift(await draftRes.data)
  }
  return {
    props: {
      blogs: data
    }
  }
}
export default BlogHome
