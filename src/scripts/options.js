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
   Filters
   ========================================================================== */

var change = new Event('change')
var filterSelect = document.querySelectorAll('.filter')[0]
filterSelect.addEventListener('change', function () {
  storage.set({ filter: this.value })
})

storage.get('filter', function (resp) {
  var filter = resp.filter
  if (filter) {
    filterSelect.value = filter
    filterSelect.dispatchEvent(change)
  }
})

