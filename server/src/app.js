import express from 'express'
import morgan from 'morgan'
import tasksRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors({ origin: `http://localhost:5173`, credentials: true }))
app.use(morgan('dev'))
app.use(cookieParser()) // req.cookies > req.headers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => res.json({ message: "Welcome to my API" }))
app.use('/api', tasksRoutes)
app.use('/api', authRoutes)

// Error handler 
app.use((err, req, res, next) => {
    res.status(500).json({ status: "error", message: err.message })
})

export default app

