import { OpenAPIHono } from '@hono/zod-openapi'
import { userGetRoute, userPostRoute } from './route'

const webApp = new OpenAPIHono({
  defaultHook: async (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: `Validation Error. ${result.error}`,
        },
        400,
      )
    }
    return
  },
})

export const webRouter = webApp
  .openapi(userGetRoute, async (c) => {
    return c.json({
      user: 'foo-users',
    })
  })
  .openapi(userPostRoute, async (c) => {
    const { name, country } = await c.req.valid('json')
    const header = c.req.header()
    console.log(header)
    return c.json({
      message: `Hello, ${name}. Your country is ${country}.`,
    })
  })
