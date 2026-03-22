import { Router } from 'express'
import { getDb } from '../db/database.js'

const router = Router()

function getDeviceId(req, res) {
  const deviceId = req.headers['x-device-id']
  if (!deviceId || deviceId.length < 8) {
    res.status(400).json({ error: 'Missing or invalid X-Device-ID header' })
    return null
  }
  return deviceId
}

// GET /api/travel-list
router.get('/', (req, res) => {
  const deviceId = getDeviceId(req, res)
  if (!deviceId) return

  const { status } = req.query
  const db = getDb()
  const visaData = req.app.locals.visaData

  let rows
  if (status) {
    rows = db.prepare(
      'SELECT * FROM travel_list WHERE device_id = ? AND status = ? ORDER BY updated_at DESC'
    ).all(deviceId, status)
  } else {
    rows = db.prepare(
      'SELECT * FROM travel_list WHERE device_id = ? ORDER BY updated_at DESC'
    ).all(deviceId)
  }

  // Enrich with country data
  const enriched = rows.map(row => {
    const country = visaData.countries.find(c => c.code === row.country_code)
    return {
      ...row,
      country: country ? {
        code: country.code,
        name: country.name,
        flag_emoji: country.flag_emoji,
        region: country.region,
        capital: country.capital,
      } : null
    }
  })

  res.json(enriched)
})

// POST /api/travel-list  (upsert)
router.post('/', (req, res) => {
  const deviceId = getDeviceId(req, res)
  if (!deviceId) return

  const { country_code, status, notes = '' } = req.body
  if (!country_code || !status) {
    return res.status(400).json({ error: 'country_code and status are required' })
  }

  const validStatuses = ['visited', 'planned', 'wishlist']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'status must be one of: visited, planned, wishlist' })
  }

  const code = country_code.toUpperCase()
  const db = getDb()

  const result = db.prepare(`
    INSERT INTO travel_list (device_id, country_code, status, notes)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(device_id, country_code) DO UPDATE SET
      status = excluded.status,
      notes = excluded.notes,
      updated_at = CURRENT_TIMESTAMP
  `).run(deviceId, code, status, notes)

  const row = db.prepare(
    'SELECT * FROM travel_list WHERE device_id = ? AND country_code = ?'
  ).get(deviceId, code)

  res.status(result.changes > 0 ? 201 : 200).json(row)
})

// PUT /api/travel-list/:code
router.put('/:code', (req, res) => {
  const deviceId = getDeviceId(req, res)
  if (!deviceId) return

  const code = req.params.code.toUpperCase()
  const { status, notes } = req.body
  const db = getDb()

  const existing = db.prepare(
    'SELECT * FROM travel_list WHERE device_id = ? AND country_code = ?'
  ).get(deviceId, code)

  if (!existing) {
    return res.status(404).json({ error: 'Entry not found' })
  }

  const newStatus = status || existing.status
  const newNotes = notes !== undefined ? notes : existing.notes

  db.prepare(`
    UPDATE travel_list SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE device_id = ? AND country_code = ?
  `).run(newStatus, newNotes, deviceId, code)

  const updated = db.prepare(
    'SELECT * FROM travel_list WHERE device_id = ? AND country_code = ?'
  ).get(deviceId, code)

  res.json(updated)
})

// DELETE /api/travel-list/:code
router.delete('/:code', (req, res) => {
  const deviceId = getDeviceId(req, res)
  if (!deviceId) return

  const code = req.params.code.toUpperCase()
  const db = getDb()

  const result = db.prepare(
    'DELETE FROM travel_list WHERE device_id = ? AND country_code = ?'
  ).run(deviceId, code)

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Entry not found' })
  }

  res.json({ deleted: true, country_code: code })
})

export default router
