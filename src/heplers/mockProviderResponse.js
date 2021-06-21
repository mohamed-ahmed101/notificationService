pushNotificationRequest = async (data) => {
   return await sleep(8000);
}

SMSRequest = async (data) => {
  return  await sleep(30000);
}


sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(Math.round(Math.random())), ms));

module.exports = {
    pushNotificationRequest, SMSRequest
}