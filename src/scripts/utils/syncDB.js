import storage from './storage'
import bundled from '../../../cinemagraphs.json'

const dataBaseUrl = 'https://raw.githubusercontent.com/Hemmingsson/Freeze/master/cinemagraphs.json'
const dayInMs = 86400000
const valid = items => Array.isArray(items) && items.length > 0 && items.every(id => typeof id === 'string' && /^[A-Za-z0-9]+$/.test(id))

exports.syncDataBase = async function () {
  const cached = await new Promise(resolve => storage.get(['imgurIds', 'age'], resolve))
  if (valid(cached.imgurIds) && Date.now() - cached.age < dayInMs) return cached.imgurIds
  try {
    const response = await fetch(dataBaseUrl, { credentials: 'omit', signal: AbortSignal.timeout(10000) })
    if (!response.ok) throw new Error('Cinemagraph list unavailable')
    const data = await response.json()
    if (!valid(data.items)) throw new Error('Invalid cinemagraph list')
    await new Promise(resolve => storage.set({ imgurIds: data.items, age: Date.now() }, resolve))
    return data.items
  } catch (error) {
    // A fresh install can still open a new tab while offline.
    return valid(cached.imgurIds) ? cached.imgurIds : bundled.items
  }
}
