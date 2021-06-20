const redis = require("redis");
const { promisify } = require('util');
const logger = require('../logger');
class redisDB {

    constructor(configs) {
        this.name = "redisDB";
        this.configs = configs;

        this.client = redis.createClient(this.configs);

        this.client.on("error", (error) => {
            logger.error("redis server error on port", { congis: this.configs, error });
        });

        this.client.on("connect", () => {
            logger.info("Connection to Redis", this.configs)
        });

        let Methods = ['get', 'set', 'rpush' , 'zadd' , 'bzpopmin'];

        for (let method of Methods) {
            this['_' + method] = promisify(this.client[method]).bind(this.client);
            this[method] = async (...args) => {
                try {
                    return await this['_' + method](...args) ;
                } catch (error) {
                    return { serverCode : 400 , serverMsg : `redisError : ${error.message}`}
                }
            }
        }

    }

    stop() {
        this.client.unref()
    }

}

module.exports = redisDB;
