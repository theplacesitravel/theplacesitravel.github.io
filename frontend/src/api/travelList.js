import client from './client'

export const fetchTravelList = (status) =>
  client.get('/travel-list', { params: status ? { status } : {} }).then(r => r.data)

export const addToTravelList = (data) =>
  client.post('/travel-list', data).then(r => r.data)

export const updateTravelListEntry = (code, data) =>
  client.put(`/travel-list/${code}`, data).then(r => r.data)

export const removeFromTravelList = (code) =>
  client.delete(`/travel-list/${code}`).then(r => r.data)
