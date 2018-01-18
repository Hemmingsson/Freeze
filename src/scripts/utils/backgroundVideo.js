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
  playerElm.src = 'https://i.imgur.com/' + imageData[Math.floor(Math.random() * imageData.length)] + '.mp4'
}

