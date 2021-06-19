const workingChannelServices = require('.');
const logger = require('../logger');
class channelsService {
    constructor(configs) {
        logger.info("new instance");
        this.channels = {};
        this.initialize()
    }

    initialize() {
        workingChannelServices.forEach(({serviceName , channelservice}) => {
            this.channels[serviceName] = new channelservice();
        })
    }

    async process(targetChannel , data){

        if(!this.channels[targetChannel]) throw { serverCode :404 , serverMsg:`this Channel: ${targetChannel} is not supported`};

        return await this.channels[targetChannel].process(data);

    }
    notify(){

    }
}

module.exports = new channelsService();