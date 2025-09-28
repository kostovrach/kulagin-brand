const cache = new Map();

export function getCache(key, ttl) {
    const cached = cache.get(key);
    if (!cached) return null;

    if (ttl && Date.now() - cached.timestamp > ttl) {
        cache.delete(key);
        return null;
    }

    return cached.data;
}

export function setCache(key, data) {
    cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(key) {
    if (key) cache.delete(key);
    else cache.clear();
}
