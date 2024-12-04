import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

const routes = app
	.get('/', (c) => {
		console.table(c)
		return c.text('Hello Hono!')
	})
	.get('/users', (c) => {
		return c.json({
			message: 'users',
		})
	})
	.post('/api/users', (c) => {
		return c.json({
			message: 'young man is 20 years old',
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
