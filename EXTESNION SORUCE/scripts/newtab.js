
import ext from './utils/ext'
import storage from './utils/storage'
import db from './utils/syncDB'
import clock from './utils/clock'
import filter from './utils/filter'
import backgroundVideo from './utils/backgroundVideo'

/* ==========================================================================
   Init
   ========================================================================== */

var init = async function () {
  clock.init()
  filter.init()
  var imageData = await db.syncDataBase()
  backgroundVideo.init(imageData)
}
init()
