import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import 'dotenv/config'

import countriesRouter from './routes/countries.js'
import travelListRouter from './routes/travelList.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001

// Load static visa data once at startup
const visaData = JSON.parse(
  readFileSync(join(__dirname, 'data/visa-requirements.json'), 'utf-8')
)
app.locals.visaData = visaData
console.log(`✓ Loaded ${visaData.countries.length} countries from visa-requirements.json`)

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    countries: visaData.countries.length,
    lastUpdated: visaData.last_updated,
    disclaimer: visaData.disclaimer
  })
})

// Routes
app.use('/api/countries', countriesRouter)
app.use('/api/travel-list', travelListRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✓ Visa Tracker API running on http://localhost:${PORT}`)
})
