import {
	ErrorSchema,
	UserGetResSchema,
	UserPostResSchema,
	UserReqSchema,
} from '@/schema/web/userSchema'
import { createRoute } from '@hono/zod-openapi'

export const userGetRoute = createRoute({
	method: 'get',
	path: '/users',
	responses: {
		200: {
			content: {
				'application/json': {
					schema: UserGetResSchema,
				},
			},
			description: 'Returns a sample user name.',
		},
	},
})

export const userPostRoute = createRoute({
	method: 'post',
	path: '/users',
	request: {
		body: {
			content: {
				'application/json': {
					schema: UserReqSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: UserPostResSchema,
				},
			},
			description: 'Returns a posted user name, country.',
		},
		400: {
			content: {
				'application/json': {
					schema: ErrorSchema,
				},
			},
			description: 'Bad Request',
		},
	},
})
