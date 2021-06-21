const logger = require('../logger');
const redisQueue = require('./redisQueue');
const redisConnection = require('../connection/redis');


module.exports = class channel {

    constructor(configs) {
        this.name = configs.name;
        this.queueName = configs.serviceQueue;
        this.redisConfig = configs.redisConfig;
        this.queueLimit = configs.queueLimit;
        this.limitInterval = configs.limitInterval;
        this.notifyFun = configs.notify;
        this.queue = new redisQueue(this.queueName, this.queueLimit, this.limitInterval, this.redisConfig);
        this.redisClient = new redisConnection(this.redisConfig);
        this.queue.onMessage = this.process.bind(this);
    }


    async process(data) {
        logger.info("new request consumed base calss", data);
        return { message: "your request has been processed" };
    }


    async send() {
        let status = call();
        if (checkSuccess(status) || !checkRetry()) notify(status);
    }

    async notify(responseQueue, data) {
        console.log("going to send result");
        await this.redisClient.zadd(responseQueue, 0, JSON.stringify(data))

    }
}