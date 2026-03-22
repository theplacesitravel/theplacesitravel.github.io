import axios from 'axios'

// Generate or retrieve a stable device ID
function getDeviceId() {
  let id = localStorage.getItem('visa-tracker-device-id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('visa-tracker-device-id', id)
  }
  return id
}

const client = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

client.interceptors.request.use((config) => {
  config.headers['X-Device-ID'] = getDeviceId()
  return config
})

export default client
