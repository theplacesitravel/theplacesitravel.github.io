import { Router } from 'express'

const router = Router()

// GET /api/countries
// Query params: ?profile=np_only&region=Asia&status=visa_free&search=fra
router.get('/', (req, res) => {
  const { profile = 'np_only', region, status, search } = req.query
  let countries = req.app.locals.visaData.countries

  // Filter by search
  if (search) {
    const q = search.toLowerCase()
    countries = countries.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      (c.capital && c.capital.toLowerCase().includes(q))
    )
  }

  // Filter by region
  if (region) {
    countries = countries.filter(c => c.region === region)
  }

  // Resolve visa status for the requested profile and filter by status
  const result = countries.map(c => {
    const req_info = c.visa_requirements?.[profile] || { status: 'unknown' }
    return {
      code: c.code,
      name: c.name,
      region: c.region,
      flag_emoji: c.flag_emoji,
      capital: c.capital,
      visa_status: req_info.status,
      visa_type: req_info.visa_type || null,
      duration_days: req_info.duration_days || null,
      e_visa_available: req_info.e_visa_available || false,
      voa_available: req_info.voa_available || false,
    }
  })

  // Filter by visa status
  if (status) {
    const statuses = status.split(',')
    return res.json(result.filter(c => statuses.includes(c.visa_status)))
  }

  res.json(result)
})

// GET /api/countries/:code
router.get('/:code', (req, res) => {
  const code = req.params.code.toUpperCase()
  const country = req.app.locals.visaData.countries.find(c => c.code === code)

  if (!country) {
    return res.status(404).json({ error: 'Country not found' })
  }

  res.json(country)
})

// GET /api/countries/regions/list
router.get('/meta/regions', (req, res) => {
  const regions = [...new Set(req.app.locals.visaData.countries.map(c => c.region))].sort()
  res.json(regions)
})

export default router
