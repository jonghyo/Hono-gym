import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

const schema = z.object({
	name: z.string().min(1),
	country: z.string().min(1),
})

const routes = app
	.get('/', (c) => {
		console.table(c)
		return c.text('Hello Qiita AdventCalendar 2024!')
	})
	.get('/api/users', (c) => {
		return c.json({
			user: 'foo-users',
		})
	})
	.post('/api/users', zValidator('json', schema), (c) => {
		const { name, country } = c.req.valid('json')
		const header = c.req.header()
		console.log(header)
		return c.json({
			message: `Hello, ${name}. Your country is ${country}.`,
		})
	})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port,
})

// routesの型を取り、exportしておく
export type AppType = typeof routes
export default app
