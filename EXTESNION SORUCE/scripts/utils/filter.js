import storage from './storage'
import ext from './ext'

/* ==========================================================================
   Image FIlter
   ========================================================================== */

exports.init = function () {
  getAndSetFilter()
  ext.storage.onChanged.addListener(getAndSetFilter)
}

var getAndSetFilter = function () {
  var videoContainer = document.querySelectorAll('.video-wrapper')[0]
  storage.get('filter', function (resp) {
    var filter = resp.filter
    if (filter) {
      videoContainer.classList = 'video-wrapper'
      videoContainer.classList.add(filter)
    }
  })
}

