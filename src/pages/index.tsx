import * as React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => (
  <>
    <Head>
      <title>title</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1 className="title">トップ</h1>
    <Link href="/blogs">
      <a className="link">ブログトップ</a>
    </Link>
  </>
)

export default Home
