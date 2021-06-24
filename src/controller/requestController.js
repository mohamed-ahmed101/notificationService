const channelsService = require('../services/channelsService');
const request = require('../models/request');
const notificationStatusControllerClass = require('./notificationStatusController');
const notificationStatusController = new notificationStatusControllerClass();

const messageTempleteControllerClass = require('./messageTemplateController');
const messageTemplateController = new messageTempleteControllerClass();

module.exports = class requestController {


    async hi() {
        console.log("hoiiii")
        return { greeting: "hi" };
    }

    async all() {
        return await request.find()
    }

    async filter(body) {
        let { service_id, amount, operator_id, service_provider_id } = body;
        return request.find({ service_id });
    }

    async one(body) {
        let { id: _id } = body;
        return request.findOne({ _id });
    }

    async save(body) {

        let messageTemplateResult = await messageTemplateController.one({ id: body.messageID });
        if (!messageTemplateResult) throw { serverCode: 404, serverMsg: "messageID not exist enter vaild one" }
        let channelsServiceCheck = await channelsService.check(body.channel, body);
        channelsServiceCheck?.serverCode && (body.status = channelsServiceCheck.serverMsg);
        const notificationReq = new request(body);
        let saveRequestResult = await notificationReq.save();
        if (body.status) throw channelsServiceResult;
        let channelsServiceResult = await channelsService.process(body.channel, { ...body, content: messageTemplateResult.content }, saveRequestResult._id);
        if (channelsServiceResult?.serverCode) throw channelsServiceResult;
        let notificationsStatusData = this.requestFormat(body, saveRequestResult._id);
        await notificationStatusController.bulksave(notificationsStatusData);
        return saveRequestResult;
    }

    async remove(body) {
        let userToRemove = await request.findOne(request.params.id);
        await request.remove(userToRemove);
    }

    requestFormat(data, requestId) {

        let { usersList, channel } = data
        return usersList.map(({ userIdentifier }) => {
            return {
                userIdentifier,
                requestId,
                channel,
                status: { code: "inprogress" }
            }
        })

    }

}
