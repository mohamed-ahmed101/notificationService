module.exports = {
    development: {
        uri : "mongodb://mongo:27017/notifications"
    },
    UAT: {
        uri : "mongodb://mongo:27017/notifications"
    },
    production: {
        uri : "mongodb://mongo:27017/notifications"
    }
  }[process.env.NODE_ENV || 'development']
