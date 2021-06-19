const mongoconfigs = require('../configs/mongoConfigs.js');
const mongo = require('../connection/mongo.js');

const mongoCnnection = new mongo(mongoconfigs);

async function main(){
  await mongoCnnection.create();
} 

module.exports = main;
