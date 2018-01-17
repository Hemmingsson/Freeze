import storage from './storage'

var dataBaseUrl = 'https://cdn.rawgit.com/Hemmingsson/downtime-extension/5a5aed84/cinemagraphs.json'
var dayInMs = 86400000

function isEmpty (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

var getDataBaseFromServer = function () {
  return new Promise(function (resolve) {
    console.log('Fetching from server')
    fetch(dataBaseUrl, {
      method: 'get'
    }).then(function (response) {
      return response.json()
    }).then(function (j) {
      resolve(j.items)
    })
  })
}

var getDataBaseFromStorage = function () {
  console.log('Getting from storage')
  return new Promise(function (resolve) {
    storage.get('imgurIds', function (resp) {
      resolve(resp)
    })
  })
}

var isDataBaseOlderThen = function (milliseconds) {
  return new Promise(async function (resolve) {
    storage.get('age', function (resp) {
      var difference = Date.now() - resp.age
      if (difference < milliseconds) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

exports.syncDataBase = function () {
  console.log('Starting to sync Database')
  return new Promise(async function (resolve) {
    // Rerteve database from storage
    var db = await getDataBaseFromStorage()
    var isOld = await isDataBaseOlderThen(dayInMs)

    // Was data found and was it fresh?
    if (isEmpty(db.imgurIds) || isOld) {
      isOld ? console.log('🚨 Data is old') : console.log('🚨 No data Found')

      // Get new data from server
      db = await getDataBaseFromServer()
      // store in local storage
      storage.set({ imgurIds: db, age: Date.now() }, function () {
        console.log('Data from server saved to storage')
        resolve(db)
      })
    } else {
      console.log('Database found')
      resolve(db.imgurIds)
    }
  })
}
