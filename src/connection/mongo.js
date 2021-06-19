const mongoose = require('mongoose');
const logger = require('../logger');

class mongoConnection {
    constructor(configs){
      this.configs= configs;
    }

    async create(){
        try {
          return await mongoose.connect(this.configs.uri,{useNewUrlParser: true, useUnifiedTopology: true})
        } catch (error) {
            logger.error('Unable to connect to the database:', error)
        }
    } 
}

module.exports = mongoConnection;