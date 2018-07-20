const Redis = require('ioredis')
const redis = new Redis()


async function storeMessageID (id) {
    try {
        const store = await redis.set(`${id}`, id)
    } catch (error) { console.log('Error storing message id to Redis', error) }
}

async function redisCheck (id) {
    const entry = await redis.get(`${id}`)
    if (entry == null) {
        return entry
    } else {
        console.log('duplicate god dam message homes')
    }
}

