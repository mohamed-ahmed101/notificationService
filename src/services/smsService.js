const channelClass = require('../classes/channel');
const logger = require('../logger');
const redisConfig = require('../configs/redisConfigs');
const configs = {
    name: "smsService",
    serviceQueue: "SMSQueue",
    redisConfig
}
class smsService extends channelClass {

    constructor() {
        super(configs);
        this.queue.onMessage = this.process.bind(this);
    }

    async process(data){
        logger.info("new request consumed" , data);
        return {message :"your request has been processed"};
       }

    async send() {
        
    }   
}

new smsService();