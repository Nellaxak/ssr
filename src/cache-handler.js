const store = new Map();
class CacheHandler {
  constructor(options) {
    console.log('CacheHandler constructor options', options)
    this.options = options
  }

  async get(key) {
    console.log('cache get', key)
    return store.get(key)
    // ...
  }

  async set(key, data, ctx) {
    console.log('dddd', key, 'data', data, 'ctx', ctx)
    store.set(key,data)
    // ...
  }

  async revalidateTag(tag) {
    // ...
  }
}
module.exports = CacheHandler;