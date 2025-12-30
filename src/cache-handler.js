class CacheHandler {
  constructor(options) {
    this.options = options
  }

  async get(key) {
    // ...
  }

  async set(key, data, ctx) {
    // ...
    console.log(' set CacheHandler', data, ctx)
  }

  async revalidateTag(tag) {
    // ...
  }
}