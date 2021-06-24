const channelClass = require('../classes/channel');
const logger = require('../logger');
const { pushNotificationRequest } = require('../heplers/mockProviderResponse');
const redisConfig = require('../configs/redisConfigs');
const { json } = require('express');
const configs = {
    name: "pushNotificationService",
    serviceQueue: "PUSHQueue",
    queueLimit: 50,
    limitInterval: 60000,
    redisConfig
}
class pushNotificationService extends channelClass {

    constructor() {
        super(configs);
        this.queue.onMessage = this.process.bind(this);
    }

    async process(data) {
        logger.info(`new rconsumedddequest consumed at ${configs.name} `, { data });
        this.send(data)
        return { message: "your request has been processed" };
    }

    async send(messageData) {

        let { message, expireAt, sendAt, requestId, responseQueueName } = messageData;
        messageData.retriesNumber ? messageData.retriesNumber++ : (messageData.retriesNumber = 1)

        let basicData = { usersList: message.usersList, requestId, retriesNumber: messageData.retriesNumber };
        let statusCode = "";
        let providerResponse = await pushNotificationRequest(message);
        console.log("pushNotificationProviderResopnse ->>>", providerResponse)
        if (providerResponse) statusCode = "success";
        else if (this.Expired(expireAt)) statusCode = "expired";
        else if (!providerResponse && --messageData.retry)
            return await this.redisClient.zadd(this.queueName, sendAt, JSON.stringify(messageData));
        else statusCode = "maxretries";

        return await this.notify(responseQueueName, { ...basicData, status: { code: statusCode } })

    }

    Expired(timestamp) {
        return Date.now() > timestamp
    }

}

new pushNotificationService();