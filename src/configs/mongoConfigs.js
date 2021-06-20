module.exports = {
    development: {
        uri : "mongodb://localhost:27017/notifications"
    },
    UAT: {
        uri : "mongodb://localhost:27017/notifications"
    },
    production: {
        uri : "mongodb://localhost:27017/notifications"
    }
  }[process.env.NODE_ENV || 'development']
