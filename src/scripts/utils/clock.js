import storage from './storage'

/* ==========================================================================
   Clock
   ========================================================================== */

var clockType12 = false

exports.init = function (selector) {
  var elm = document.querySelectorAll(selector)[0]

  storage.get('clockType', function (resp) {
    var clockType = resp.clockType
    if (clockType === '12') { clockType12 = true }
    clock(elm, clockType12)
    setInterval(function () { clock(elm, clockType12) }, 1000)

    chrome.storage.onChanged.addListener(function () {
      storage.get('clockType', function (resp) {
        var clockType = resp.clockType
        if (clockType === '12') { clockType12 = true } else { clockType12 = false }
        clock(elm, clockType12)
      })
    })
  })
}

var clock = function (elm, clockType12) {
  var time = new Date()
  var hours = time.getHours()
  console.log('second')
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
  }
  minutes = harold(minutes)

  elm.innerText = hours + ':' + minutes
}

var harold = function (standIn) {
  if (standIn < 10) {
    standIn = '0' + standIn
  }
  return standIn
}
