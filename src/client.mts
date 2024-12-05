import { hc } from 'hono/client'
import type { AppType } from './server'

// TypeSafeなAPI Clientを生成
const client = hc<AppType>('http://localhost:3000/', {
	fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
		const headers = new Headers(requestInit?.headers) // 既存のヘッダを保持
		headers.set('x-qiita-custom-header', 'qiita adventcalendar 2024') // カスタムヘッダを追加

		return fetch(input, {
			...requestInit,
			headers, // 更新されたヘッダをセット
		})
	},
})

const res = await client.api.users.$post({
	json: {
		name: 'Qiita',
		country: 'japan',
	},
})

if (res.ok) {
	const data = await res.json()
	console.log(data)
}
