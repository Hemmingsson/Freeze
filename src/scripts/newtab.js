import storage from './utils/storage'
import db from './utils/syncDB'
import clock from './utils/clock'

var imageData
var player

/* ==========================================================================
   Background Player
   ========================================================================== */

var initPlayer = function () {
  player = document.getElementsByTagName('video')[0]
  player.addEventListener('canplaythrough', function () {
    this.classList.remove('loading')
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

var setFilter = function () {
  var videoContainer = document.querySelectorAll('.video-contain')[0]
  storage.get('filter', function (resp) {
    var filter = resp.filter
    if (filter) {
      videoContainer.classList = 'video-contain'
      videoContainer.classList.add(filter)
    }
  })
}

var setClock = function () {
  var clockElm = document.querySelectorAll('.clock')[0]
  storage.get('clockHidden', function (resp) {
    var clockHidden = resp.clockHidden
    if (clockHidden) {
      if (clockHidden === 'true') {
        clockElm.style.opacity = '1'
      } else {
        clockElm.style.opacity = '0'
      }
    } else {
      clockElm.style.opacity = '1'
    }
  })
}

chrome.storage.onChanged.addListener(function () {
  setFilter()
  setClock()
})

/* ==========================================================================
   Init
   ========================================================================== */

var init = async function () {
  console.log('init')
  initPlayer()
  clock.init('.time')
  setFilter()
  setClock()
  imageData = await db.syncDataBase()
  loadBackground()
}

init()

