import { Blogs } from '~/interfaces'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import ErrorPage from 'next/error'

interface Props {
  blog: Blogs
  errors?: string
}

const BlogDetail: NextPage<Props> = (props) => {
  if (!props.blog) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>ブログ詳細</title>
      </Head>
      <h1 className="title">ブログ詳細</h1>
      <Link href="/blogs/">
        <a className="link">ブログトップへ</a>
      </Link>
      <div className="item">
        <h2 className="item__title">{props.blog.title}</h2>
        <p className="item__label">{props.blog.label}</p>
        <p className="item__description">{props.blog.description}</p>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY }
  }
  const res = await axios.get(process.env.END_POINT + 'blogs/?limit=9999', key)
  const data: Array<Blogs> = await res.data.contents
  const paths = data.map((item) => ({
    params: { id: item.id.toString() }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData
}) => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY }
  }
  let url = process.env.END_POINT + 'blogs/' + params?.id
  // 下書きは draftKey を含む必要があるのでプレビューの時は追加
  if (preview) {
    url += `?draftKey=${previewData.draftKey}`
  }
  const res = await axios.get(url, key)
  const data: Blogs = await res.data
  return {
    props: { blog: data }
  }
}

export default BlogDetail
