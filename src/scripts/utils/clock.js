import storage from './storage'
import ext from './ext'

/* ==========================================================================
   Clock
   ========================================================================== */

exports.init = function () {
  getAndSetClock()
  ext.storage.onChanged.addListener(getAndSetClock)
}

var clockActive

var getAndSetClock = function () {
  var digiClock = document.querySelector('.digi-clock')
  var analogClock = document.querySelector('.analog-clock')

  storage.get('clockType', function (resp) {
    if (clockActive) {
      clearTimeout(clockActive)
    }

    var clockType = resp.clockType

    var twelwClock

    if (clockType === '24') {
      twelwClock = false
    } else {
      twelwClock = true
    }

    console.log(twelwClock)

    if (clockType === 'analog') {
      analogClock.classList.remove('hidden')
      digiClock.classList.add('hidden')
    } else {
      analogClock.classList.add('hidden')
      digiClock.classList.remove('hidden')
    }

    if (clockType === 'hidden') {
      analogClock.classList.add('hidden')
      digiClock.classList.add('hidden')
    }
    startClock(twelwClock)
  })
}

var startClock = function (twelwClock) {
  var digitsElm = document.querySelector('.time')

  var secondHandElm = document.querySelector('.second-hand')
  var minuteHandElm = document.querySelector('.minute-hand')
  var hourHandElm = document.querySelector('.hour-hand')

  updateClock(twelwClock, digitsElm, secondHandElm, minuteHandElm, hourHandElm)

  var updater = function () {
    console.log('update')
    updateClock(twelwClock, digitsElm, secondHandElm, minuteHandElm, hourHandElm)
    clockActive = setTimeout(updater, 1000)
  }
  updater()
}

var updateClock = function (twelwClock, digitsElm, secondHandElm, minuteHandElm, hourHandElm) {
  // Das time
  var time = new Date()
  var hours = time.getHours()
  var minutes = time.getMinutes()
  var seconds = time.getSeconds()

  // Conver to 12h Clock

  if (twelwClock) {
    if (hours > 12) {
      hours = hours - 12
    }
    if (hours === 0) {
      hours = 12
    }
  } else {
    hours = harold(hours)
  }

  // Analog Clock

  var secondDegrees = ((seconds / 60) * 360) + 90
  secondHandElm.style.transform = `rotate(${secondDegrees}deg)`

  var minuteDegrees = ((minutes / 60) * 360) + 90
  minuteHandElm.style.transform = `rotate(${minuteDegrees}deg)`

  var hourDegrees = ((hours / 12) * 360) + 90
  hourHandElm.style.transform = `rotate(${hourDegrees}deg)`
  console.log(hours)

  if (secondDegrees === 444 || secondDegrees === 90) {
    secondHandElm.style.transition = 'all 0s ease 0s'
  } else {
    secondHandElm.style.transition = 'all 60ms cubic-bezier(0.645, 0.045, 0.355, 1)'
  }

  // Digital Clock

  minutes = harold(minutes)
  digitsElm.innerText = hours + ':' + minutes
}

var harold = function (standIn) {
  if (standIn < 10) {
    standIn = '0' + standIn
  }
  return standIn
}
