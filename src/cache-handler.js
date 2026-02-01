const store = new Map();
class CacheHandler {
  constructor(options) {
    console.log('CacheHandler constructor options', options)
    this.options = options
    //this.data
  }

  async get(key) {
    console.log('cache get', key, store.get(key))
    //prev chunk=store.get(key)
    //return store.get(key)//err
    // ...
  }

  async set(key, data, ctx) {
    console.log('dddd', key, 'data', data, 'ctx', ctx)
    //prev chunk=store.get(key)
    //add new chunk-data.data.body uint8array readable stream
    if (store.get(key) === undefined) {
      store.set(key, data)
      console.log('getter', store.get(key))
    }
    // ...
  }

  async revalidateTag(tag) {
    // ...
  }
}
//const fff = new CacheHandler()
module.exports = CacheHandler;