module.exports = [
    {
        serviceName: "SMS",
        channelservice: require('./smsService')
    },
    {
        serviceName: "PUSH",
        channelservice: require('./pushNotificationService')
    },

]