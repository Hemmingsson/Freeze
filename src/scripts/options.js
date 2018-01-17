import ext from './utils/ext'
import storage from './utils/storage'

/* ==========================================================================
   Clock Type
   ========================================================================== */

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

var clockToggle

var clockTypeVisibillity = function (value) {
  var clockTypeSection = document.querySelectorAll('.clock-type')[0]
  if (value === 'true') {
    clockTypeSection.style.display = 'block'
  } else {
    clockTypeSection.style.display = 'none'
  }
}

clockHiddenRadios.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var value = this.value
    clockTypeVisibillity(value)
    storage.set({ clockHidden: value })
  })
})
