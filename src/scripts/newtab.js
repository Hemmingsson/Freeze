
import storage from './utils/storage'

var dataBaseUrl = 'https://cdn.rawgit.com/Hemmingsson/mattias.lol/e0b206a3/test.json'
var dayInMs = 86400000
var imageData
var player

/* ==========================================================================
   Database
   ========================================================================== */

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

var syncDataBase = function () {
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

/* ==========================================================================
   Background Player
   ========================================================================== */

var initPlayer = function () {
  player = document.getElementsByTagName('video')[0]
  player.addEventListener('canplaythrough', function () {
    this.classList.remove('loading')
    console.timeEnd('load')
  })
  player.addEventListener('error', function () {
    this.classList.add('loading')
    console.error('Backgound not found')
    loadBackground()
  })
}

function loadBackground () {
  player.classList.add('loading')
  console.log(imageData)
  player.src = 'https://i.imgur.com/' + imageData[Math.floor(Math.random() * imageData.length)] + '.mp4'
}

/* ==========================================================================
   Clock
   ========================================================================== */

var initClock = function (selector) {
  var elm = document.querySelectorAll(selector)[0]
  var clockType12 = false

  storage.get('clockType', function (resp) {
    var clockType = resp.clockType
    if (clockType === '12') { clockType12 = true }
    clock(elm, clockType12)
    setInterval(function () { clock(elm, clockType12) }, 1000)
  })
}

var clock = function (elm, clockType12) {
  var time = new Date()
  var hours = time.getHours()

  var minutes = time.getMinutes()

  if (clockType12) {
    if (hours > 12) {
      hours = hours - 12
    }

    if (hours == 0) {
      hours = 12
    }
  } else {
    hours = harold(hours)
    minutes = harold(minutes)
  }

  elm.innerText = hours + ':' + minutes
}

var harold = function (standIn) {
  if (standIn < 10) {
    standIn = '0' + standIn
  }
  return standIn
}

/* ==========================================================================
   Init
   ========================================================================== */

var init = async function () {
  console.time('load')
  console.log('init')
  initPlayer()
  initClock('.time')
  imageData = await syncDataBase()
  loadBackground()
}

init()

