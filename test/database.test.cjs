const {test}=require('node:test')
const assert=require('node:assert/strict')
const vm=require('node:vm')
const fs=require('node:fs')
function sync(cached,fetch){
 const sandbox={exports:{},storage:{get:(k,cb)=>cb(cached),set:(v,cb)=>cb()},bundled:{items:['fallback']},fetch,AbortSignal,Date}
 const source=fs.readFileSync('src/scripts/utils/syncDB.js','utf8').replace(/^import .*\n/gm,'')
 vm.runInNewContext(source,sandbox)
 return sandbox.exports.syncDataBase()
}
test('fresh cached data does not require network access',async()=>{
 assert.deepEqual(await sync({imgurIds:['cached'],age:Date.now()},()=>{throw new Error('should not fetch')}),['cached'])
})
test('a fresh offline install uses the bundled list',async()=>{
 assert.deepEqual(await sync({},async()=>{throw new Error('offline')}),['fallback'])
})
test('invalid server data preserves the existing cache',async()=>{
 assert.deepEqual(await sync({imgurIds:['cached'],age:0},async()=>({ok:true,json:async()=>({items:[]})})),['cached'])
})
