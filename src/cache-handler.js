const store = new Map();
class CacheHandler {
  constructor(options) {
    this.options = options
  }

  async get(key) {
    // ...
  }

  async set(key, data, ctx) {
    console.log('dddd', key, data, ctx)
    // ...
  }

  async revalidateTag(tag) {
    // ...
  }
}
module.exports = CacheHandler;