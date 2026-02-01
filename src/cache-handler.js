const store = new Map();
class CacheHandler {
  constructor(options) {
    //console.log('CacheHandler constructor options', options)
    this.options = options
    //this.data
  }

  async get(key) {
    //console.log('cache get', key, store.get(key))
    //prev chunk=store.get(key)
    //return store.get(key)//err
    // ...
  }

  async set(key, data, ctx) {
    console.log('dddd', key, 'data', data, 'ctx', ctx)
    //prev chunk=store.get(key)
    //add new chunk-data.data.body uint8array readable stream
    /*if (store.get(key) === undefined) {
      store.set(key, data)
      console.log('getter', store.get(key))
    }*/
    store.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags || [],
    });
    console.log('store', store)
  }

  async revalidateTag(tag) {
    /*const tags = Array.isArray(tags) ? tags : [tags];
    for (const [key, rec] of this.store) {
      if (rec.tags.some(tag => tags.includes(tag))) {
        store.delete(key);//delete all data of key
      }
    }*/
  }
}
module.exports = CacheHandler;