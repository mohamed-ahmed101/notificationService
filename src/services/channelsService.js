const workingChannelServices = require('.');
const redisConnection = require('../connection/redis');
const redisQueue = require('../classes/redisQueue');
const redisConfig = require('../configs/redisConfigs');
const { replace } = require('../heplers/templateReplace');
const logger = require('../logger');
const responseQueueName = "channelsService:res"

const messageTempleteControllerClass = require('../controller/notificationStatusController');
const messageTemplateController = new messageTempleteControllerClass();

class channelsService {
    constructor() {
        this.name = "channelsService"
        this.redisClient = new redisConnection(redisConfig);
        this.responseQueue = new redisQueue(responseQueueName, null, null, redisConfig)
        this.responseQueue.onMessage = this.notify.bind(this);
        this.channels = {};
        this.initialize()
    }

    initialize() {
        workingChannelServices.forEach(({ serviceName, serviceQueue }) => {
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
            messages.push(sendAt, JSON.stringify({ message, retry, sendAt, expireAt, requestId, responseQueueName }));
        let QueuingResult = await this.redisClient.zadd(this.channels[targetChannel], messages);
        return QueuingResult?.serverCode ? QueuingResult : "Queued";
    }

    formatData(data) {
        let { usersList = [], content } = data;
        return usersList[0].templateData ? this.templateReplacment(usersList, content) :
            this.languageClassification(usersList, content);
    }

    templateReplacment(usersList, content) {
        let messages = []
        for (let { userIdentifier, preferredLang, templateData } of usersList) {
            let message = content[preferredLang];
            !message && console.log("no content") //return 
            messages.push({
                messageText: replace(message, templateData),
                usersList: [userIdentifier]
            })
        }
        return messages;
    }

    languageClassification(usersList, content) {
        let data = usersList.reduce((acc, user) => {
            let { userIdentifier, preferredLang } = user;
            let messageText = content[preferredLang];
            !messageText && console.log("no content") //return acc ;
            acc[preferredLang] = !acc[preferredLang] ?
                { messageText, usersList: [userIdentifier] } : {
                    ...acc[preferredLang], usersList: [...acc[preferredLang].usersList, userIdentifier]
                }
            return acc;
        }, {});
        return Object.values(data);
    }

   async notify(data) {
        await messageTemplateController.bulkUpdate(data)
        console.log("recived rsponse ->>>>>>>>", data);
    }
}

module.exports = new channelsService();