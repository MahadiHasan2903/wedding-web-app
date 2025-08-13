const cache = new Map();

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    // This could be stored anywhere, like durable storage
    return cache.get(key);
  }

  async set(key, data, ctx) {
    // This could be stored anywhere, like durable storage
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tag) {
    for (let [key, value] of cache) {
      if (value.tags && value.tags.includes(tag)) {
        cache.delete(key);
      }
    }
  }
  
};
