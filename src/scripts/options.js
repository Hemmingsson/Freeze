import ext from './utils/ext'
import storage from './utils/storage'
import ga from './utils/ga'

/* ==========================================================================
   Refresh Preview
   ========================================================================== */

document.querySelector('.preview-wrapper').addEventListener('click', function (e) {
  storage.set({timerAge: 0})
  document.querySelector('.preview').contentWindow.location.reload()
})

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

if (isFirefox) {
  document.querySelector('.filter').parentElement.style.display = 'none'
}

/* ==========================================================================
   Get and set Options
   ========================================================================== */

var getSetOption = function (selector, storageName) {
  var selectElm = document.querySelectorAll(selector)[0]
  var change = new Event('change')
  selectElm.addEventListener('change', function () {
    var storageObj = {}
    storageObj[storageName] = this.value
    storage.set(storageObj)
    storage.set({timerAge: Date.now()})
  })

  storage.get(storageName, function (resp) {
    var item = resp[storageName]
    if (item) {
      selectElm.value = item
      selectElm.dispatchEvent(change)
    }
  })
}

getSetOption('.filter', 'filter')
getSetOption('.timer', 'timer')
getSetOption('.clock-type', 'clockType')
ga.init()
