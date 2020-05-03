import * as React from 'react'
import App, { AppProps } from 'next/app'

import 'sanitize.css'
import '../styles/common.scss'

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps }: AppProps = this.props

    return (
      <div className="layout">
        <Component {...pageProps} />
      </div>
    )
  }
}

export default MyApp
