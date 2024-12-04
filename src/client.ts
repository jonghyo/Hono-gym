import type { AppType } from '@/index.ts'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const res = client.users.$get()

console.log(res)
