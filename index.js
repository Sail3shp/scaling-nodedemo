import express from "express"
import dotenv from 'dotenv'
import postRouter from './routes/posts.routes.js'
import { globalErrorHandler } from "./middleware/errorHandler.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 1234

app.use(express.json())
app.use('/api/v1/posts',postRouter)

app.use(globalErrorHandler)

const server = app.listen(PORT,()=> {
    console.log(`server is running in port ${PORT}`)
})

process.on('unhandledRejection',(err) => {
    console.log(err.name,err.message)
    console.log('unhandled rejection occured shutting down')

    server.close(() => {
        process.exit(1)
    })
})