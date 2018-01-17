import ext from './utils/ext'
import storage from './utils/storage'

var optionsLink = document.querySelector('.js-options')
optionsLink.addEventListener('click', function (e) {
  e.preventDefault()

  ext.tabs.create({'url': 'chrome://extensions/?options=' + chrome.runtime.id})
})
