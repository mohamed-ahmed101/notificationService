const channelClass = require('../classes/channel');
const logger = require('../logger');
const redisConfig = require('../configs/redisConfigs');
const configs = {
    name: "pushNotificationService",
    serviceQueue: "PUSHQueue",
    queueLimit : 50,
    limitInterval : 60000,
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

    async send(msg) {//specified for each channel             
            //simulate send
            console.log("msg send ", JSON.parse(msg))
          //  this.notify(msg, Math.round(Math.random()))

    }
}

new pushNotificationService();