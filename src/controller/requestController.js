const channelsService = require('../services/channelsService');
const request = require('../models/request');
module.exports = class requestController {

    async all() {
        return request.find();
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
        console.log("new request ->>>>>>>>>>>>>>>>>>",body)
        const notificationReq = new request(body);
        let save= await notificationReq.save();
        let res = await channelsService.process(notificationReq.category, notificationReq);
        //res channel not exit save fail
        //process >> save 
        //tODO add raw for each mesage per user pending//processing
        
        //id fail ,id success
        return {save , res };
    }

    async remove(body) {
        let userToRemove = await request.findOne(request.params.id);
        await request.remove(userToRemove);
    }

}
