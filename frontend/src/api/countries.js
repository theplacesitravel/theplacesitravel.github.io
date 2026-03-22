const DATA_URL = `${import.meta.env.BASE_URL}data/visa-requirements.json`

let cache = null

async function loadData() {
  if (cache) return cache
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error('Failed to load visa data')
  cache = await res.json()
  return cache
}

export async function fetchCountries({ profile, search, region, status } = {}) {
  const data = await loadData()

  let countries = data.countries.map(c => {
    const req = c.visa_requirements[profile] ?? {}
    return {
      code: c.code,
      name: c.name,
      region: c.region,
      flag_emoji: c.flag_emoji,
      capital: c.capital,
      visa_status: req.status ?? 'unknown',
      duration_days: req.duration_days ?? null,
      e_visa_available: req.e_visa_available ?? false,
      voa_available: req.voa_available ?? false,
    }
  })

  if (search) {
    const q = search.toLowerCase()
    countries = countries.filter(c => c.name.toLowerCase().includes(q))
  }
  if (region) {
    countries = countries.filter(c => c.region === region)
  }
  if (status) {
    const statuses = status.split(',')
    countries = countries.filter(c => statuses.includes(c.visa_status))
  }

  return countries
}

export async function fetchCountry(code) {
  const data = await loadData()
  return data.countries.find(c => c.code === code) ?? null
}
