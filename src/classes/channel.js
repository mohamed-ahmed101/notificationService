const logger = require('../logger');
module.exports = class channel {

    constructor(configs) {
        this.name= configs.name
        this.notifyFun = configs.notify
    }
    
    async process(){
     logger.info("new request done");
     return {message :"your request has been processed"};
    }

    async initialize() {

    }

    async checkRetry() {

    }

    async checkSuccess() {

    }

    async call() {

    }

    async send() {
        let status = call();
        if (checkSuccess(status) || !checkRetry()) notify(status);
    }

    async register() {
       
    }

    notify() {

    }
}