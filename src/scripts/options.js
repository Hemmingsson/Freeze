import ext from './utils/ext'
import storage from './utils/storage'
import clock from './utils/clock'

/* ==========================================================================
   Clock Type
   ========================================================================== */

clock.init('.time')

var clockTypeRadio = document.querySelectorAll('.clock-type input')

storage.get('clockType', function (resp) {
  var clockType = resp.clockType
  var option

  if (clockType) {
    for (var i = 0; i < clockTypeRadio.length; i++) {
      if (clockTypeRadio[i].value == clockType) {
        option = clockTypeRadio[i]
      }
    }
  } else {
    option = clockTypeRadio[0]
  }

  option.setAttribute('checked', 'checked')
})

clockTypeRadio.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var value = this.value
    storage.set({ clockType: value })
  })
})

/* ==========================================================================
   Clock visibility
   ========================================================================== */

var clockHiddenRadios = document.querySelectorAll('.clock-hidden input')

storage.get('clockHidden', function (resp) {
  var clockHidden = resp.clockHidden
  var option

  clockTypeVisibillity(clockHidden)

  if (clockHidden) {
    for (var i = 0; i < clockHiddenRadios.length; i++) {
      if (clockHiddenRadios[i].value == clockHidden) {
        option = clockHiddenRadios[i]
      }
    }
  } else {
    option = clockHiddenRadios[0]
  }

  option.setAttribute('checked', 'checked')
})

var clockTypeVisibillity = function (value) {
  var clockTypeSection = document.querySelectorAll('.clock-type')[0]
  var mockClock = document.querySelectorAll('.clock')[0]
  if (value === 'true') {
    clockTypeSection.classList.remove('disabeld')
    mockClock.style.opacity = '1'
  } else {
    clockTypeSection.classList.add('disabeld')
    mockClock.style.opacity = '0'
  }
}

clockHiddenRadios.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var value = this.value
    clockTypeVisibillity(value)
    storage.set({ clockHidden: value })
  })
})

var videoContainer = document.querySelectorAll('.video-contain')[0]

storage.get('imgurIds', function (resp) {
  var player = document.getElementsByTagName('video')[0]

  console.log(player)
  var imageData = resp.imgurIds
  if (imageData) {
    player.src = 'https://i.imgur.com/' + imageData[Math.floor(Math.random() * imageData.length)] + '.mp4'
  } else {
    player.src = 'https://i.imgur.com/GvgjtdK.mp4'
  }

  videoContainer.addEventListener('click', function (e) {
    if (imageData) {
      player.src = 'https://i.imgur.com/' + imageData[Math.floor(Math.random() * imageData.length)] + '.mp4'
    } else {
      player.src = 'https://i.imgur.com/GvgjtdK.mp4'
    }
  })
})

/* ==========================================================================
   Filters
   ========================================================================== */

var change = new Event('change')
var filterSelect = document.querySelectorAll('.filter')[0]
filterSelect.addEventListener('change', function () {
  videoContainer.classList = 'video-contain'
  videoContainer.classList.add(this.value)
  storage.set({ filter: this.value })
})

storage.get('filter', function (resp) {
  var filter = resp.filter
  if (filter) {
    filterSelect.value = filter
    filterSelect.dispatchEvent(change)
  }
})

document.onkeydown = function (e) {
  var upArrow = 38
  var donwArrow = 40

  if (e.keyCode === upArrow) {
    if (filterSelect.selectedIndex === 0) {
      filterSelect.selectedIndex = filterSelect.length - 1
    } else {
      filterSelect.selectedIndex === filterSelect.selectedIndex--
    }
  }

  if (e.keyCode === donwArrow) {
    if (filterSelect.length - 1 === filterSelect.selectedIndex) {
      filterSelect.selectedIndex = 0
    } else {
      filterSelect.selectedIndex === filterSelect.selectedIndex++
    }
  }

  if (e.keyCode === upArrow || e.keyCode === donwArrow) {
    console.log(document.activeElement)
    filterSelect.dispatchEvent(change)
  }
}

