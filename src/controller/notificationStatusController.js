
const notificationStatus = require('../models/notificationStatus');
module.exports = class notificationStatusController {

    async all() {
        return notificationStatus.find();
    }

    async filter(body) {
        let { service_id, amount, operator_id, service_provider_id } = body;
        return notificationStatus.find({ service_id });
    }

    async one(body) {
        let { id: _id } = body;
        return notificationStatus.findOne({ _id });
    }

    async save(body) {
        const notificationsData = new notificationStatus(body)
        return await notificationsData.insert();
    }

    async bulksave(body) {
        return await notificationStatus.insertMany(body);
    }

    async bulkUpdate(body) {
        let { usersList, requestId, retriesNumber, status } = body
        return await notificationStatus.updateMany({ userIdentifier: { $in: usersList }, requestId }, { retriesNumber, status });
    }

    async remove(body) {
        let userToRemove = await notificationStatus.findOne(request.params.id);
        await notificationStatus.remove(userToRemove);
    }

}
