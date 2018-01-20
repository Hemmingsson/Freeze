import storage from './storage'

var fifte

/* ==========================================================================
   Background Player
   ========================================================================== */

exports.init = function (imageData) {
  var playerElm = document.querySelectorAll('video')[0]
  var wrapperElm = document.querySelectorAll('.video-wrapper')[0]
  playerEvents(playerElm, wrapperElm, imageData)
  loadBackground(playerElm, wrapperElm, imageData)
}

var playerEvents = function (playerElm, wrapperElm, imageData) {
  playerElm.addEventListener('canplaythrough', function () {
    wrapperElm.classList.remove('loading')
  })

  playerElm.addEventListener('error', function () {
    console.error('!!! Backgound not found')
    loadBackground(playerElm, wrapperElm, imageData)
  })
}

function loadBackground (playerElm, wrapperElm, imageData) {
  wrapperElm.classList.add('loading')
  storage.get(['timer', 'timerAge', 'currentImageId'], function (resp) {
    var timer = resp.timer
    var timerAge = resp.timerAge
    var currentImageId = resp.currentImageId

    if (timer) {
      var difference = Date.now() - timerAge
      if (difference < minToMilli(parseInt(timer)) && resp.currentImageId) {
        setBackground(playerElm, currentImageId)
      } else {
        newBackground(playerElm, imageData)
      }
    } else {
      newBackground(playerElm, imageData)
    }
  })
}

var newBackground = function (playerElm, imageData) {
  var imageId = randomFromArray(imageData)
  storage.set({currentImageId: imageId})
  storage.set({timerAge: Date.now()})
  setBackground(playerElm, imageId)
}

var randomFromArray = function (imageData) {
  return imageData[Math.floor(Math.random() * imageData.length)]
}

var setBackground = function (playerElm, imageId) {
  playerElm.src = 'https://i.imgur.com/' + imageId + '.mp4'
}

var minToMilli = function (min) {
  return min * 60000
}

