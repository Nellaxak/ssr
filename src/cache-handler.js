const store = new Map();
class CacheHandler {
  constructor(options) {
    console.log('CacheHandler constructor options', options)
    this.options = options
  }

  async get(key) {
    console.log('cache get', key)
    // ...
  }

  async set(key, data, ctx) {
    console.log('dddd', key, 'data', data, 'ctx', ctx)
    // ...
  }

  async revalidateTag(tag) {
    // ...
  }
}
module.exports = CacheHandler;