const chromeStorage = globalThis.chrome?.storage
const api = chromeStorage || globalThis.browser.storage
const area = api.sync || api.local
module.exports = {
  get(keys, callback) {
    if (chromeStorage) return area.get(keys, callback)
    return area.get(keys).then(callback)
  },
  set(values, callback = () => {}) {
    if (chromeStorage) return area.set(values, callback)
    return area.set(values).then(callback)
  }
}
