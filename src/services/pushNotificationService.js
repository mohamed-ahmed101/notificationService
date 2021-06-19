const channelClass = require('../classes/channel');
const configs = {
    name : "pushNotificationService"
}
 class pushNotificationService extends channelClass {

    constructor() {
        super(configs)
    }

 }

 module.exports = pushNotificationService;