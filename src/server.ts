import { webRouter } from '@/routes/web'
import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

const baseApp = new OpenAPIHono().basePath('/api')

baseApp.use('*', prettyJSON())
baseApp.use('*', logger())

baseApp
	.doc31('/doc', {
		openapi: '3.1.0',
		info: {
			title: 'API',
			version: '1.0.0',
		},
	})
	.get(
		'/ui',
		swaggerUI({
			url: '/api/doc',
		}),
	)

const app = baseApp.route('/web', webRouter)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port,
})

export type AppType = typeof app
