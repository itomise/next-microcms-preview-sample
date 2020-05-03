import { NextApiHandler } from 'next'
import axios from 'axios'

const preview: NextApiHandler = async (req, res) => {
  // クエリの確認
  if (
    req.query.secret !== process.env.SECRET_KEY ||
    !req.query.id ||
    !req.query.draftKey
  ) {
    return res
      .status(401)
      .json({ message: `Invalid query, ${process.env.SECRET_KEY}` })
  }

  // 下書きのデータを取得
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY }
  }
  const url =
    'https://next-test.microcms.io/api/v1/blogs/' +
    req.query.id +
    `?draftKey=${req.query.draftKey}`
  const post = await axios.get(url, key)

  // エラー処理
  if (!post) {
    return res.status(401).json({ message: 'Invalid draft key' })
  }

  // プレビューデータを格納
  res.setPreviewData({
    draftKey: req.query.draftKey,
    id: req.query.id
  })

  // トップにリダイレクト
  res.writeHead(307, { Location: `/` })

  res.end('Preview mode enabled')
}

export default preview
