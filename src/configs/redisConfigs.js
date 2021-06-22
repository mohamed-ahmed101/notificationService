module.exports = {
    development: {
        host: 'redis',
        port: 6379

    },
    UAT: {
        host: 'redis',
        port: 6379
      
    },
    production: {
        host: 'redis',
        port: 6379
    }
  }[process.env.NODE_ENV || 'development']
