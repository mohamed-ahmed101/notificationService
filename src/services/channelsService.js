const workingChannelServices = require('.');
const redisConnection = require('../connection/redis');
const redisConfig = require('../configs/redisConfigs');
const replace = require('../heplers/templateReplace');
const logger = require('../logger');

class channelsService {
    constructor() {
        this.name = "channelsService"
        this.redisClient = new redisConnection(redisConfig);
        this.channels = {};
        this.initialize()
    }

    initialize() {
        workingChannelServices.forEach(({ serviceName, serviceQueue, channelservice }) => {
            this.channels[serviceName] = serviceQueue;
        })
    }

    async check(targetChannel, data) {

        if (!this.channels[targetChannel]) return { serverCode: 404, serverMsg: `this Channel: ${targetChannel} is not supported` };
        return "ok"

    }

    async process(targetChannel, data, requestId) {
        let { retry, sendAt, expireAt } = data
        let messages = [];
        for (const message of this.formatData(data))
            messages.push(sendAt, JSON.stringify({ message, retry, sendAt, expireAt, requestId }));
        let QueuingResult = await this.redisClient.zadd(this.channels[targetChannel], 
            messages);
        return QueuingResult?.serverCode ? QueuingResult : "Queued";
    }

    formatData(data) {
        console.log("%%%%%%%%%%%%", data)
        let { usersList = [], content } = data;
        return usersList[0].templateData ? this.templateReplacment(usersList, content) :
            this.languageClassification(usersList, content);
    }

    templateReplacment(usersList, content) {
        let messages = []
        for ({ userIdentifier, preferredLang, templateData } of usersList) {
            let message = content[preferredLang];
            !message && console.log("no content") //return 
            messages.push({
                message: replace(message, templateData),
                usersList: [userIdentifier]
            })
        }
        return messages;
    }

    languageClassification(usersList, content) {
        let data = usersList.reduce((acc, user) => {
            let { userIdentifier, preferredLang } = user;
            let message = content[preferredLang];
            !message && console.log("no content") //return acc ;
            acc[preferredLang] = !acc[preferredLang] ?
                { message, usersList: [userIdentifier] } : {
                    ...acc[preferredLang], usersList: [...acc[preferredLang].usersList, userIdentifier]
                }
            return acc;
        }, {});
        console.log("&&&&&&&&&&&&&&&", data)
        return Object.values(data);
    }

    notify() {

    }
}

module.exports = new channelsService();