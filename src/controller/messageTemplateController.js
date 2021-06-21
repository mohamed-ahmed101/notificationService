
let messageTemplete = require('../models/messageTemplete');
module.exports = class messageTempleteController {

    async all() {
        return messageTemplete.find();
    }

    async filter(body) {
        let { service_id, amount, operator_id, service_provider_id } = body;
        return messageTemplete.find({ service_id });
    }

    async one(body) {
        let { id: _id } = body;
        return messageTemplete.findOne({ _id });
    }

    async save(body) {
        const message = new messageTemplete(body)
        return message.save();
    }

    async remove(body) {
        let userToRemove = await messageTemplete.findOne(request.params.id);
        await messageTemplete.remove(userToRemove);
    }

}
