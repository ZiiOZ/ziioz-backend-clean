// api/index.ts ✅
import { NowRequest, NowResponse } from '@vercel/node'
import commentsApi from './comments.api'
import aiPostEnhance from './ai-post-enhance'
import spinPost from './spin-post'
import ziiBotReply from './ziibot-reply'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', commentsApi)
app.use('/api', aiPostEnhance)
app.use('/api', spinPost)
app.use('/api', ziiBotReply)

export default app
