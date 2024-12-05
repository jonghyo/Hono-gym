import { hc } from 'hono/client'
import type { AppType } from './server'

// TypeSafeなAPI Clientを生成
const client = hc<AppType>('http://localhost:3000/', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    const headers = new Headers(requestInit?.headers) // 既存のヘッダを保持
    headers.set('x-qiita-custom-header', 'qiita adventcalendar 2024') // カスタムヘッダを追加
    headers.set('Content-Type', 'application/json') // カスタムヘッダを追加

    return fetch(input, {
      ...requestInit,
      headers, // 更新されたヘッダをセット
    })
  },
})

// Get demo
const getRes = await client.api.web.users.$get()

if (getRes.ok) {
  const data = await getRes.json()
  console.log(data)
}

// post demo
const postRes = await client.api.web.users.$post({
  json: {
    name: 'qiita',
    country: 'japan',
  },
})

if (postRes.ok) {
  const data = await postRes.json()
  console.log(data)
}
