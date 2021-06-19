const channelClass = require('../classes/channel');
const configs = {
    name : "smsService"
}
 class smsService extends channelClass {

    constructor() {
        super(configs)
    }

 }

 module.exports = smsService;