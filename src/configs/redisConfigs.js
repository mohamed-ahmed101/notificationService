module.exports = {
    development: {
        host: '10.22.1.136',
        port: 6350,
        password : "password123",
        db: 1
    },
    UAT: {
        host: '127.0.0.1',
        port: 6390
      
    },
    production: {
        host: '127.0.0.1',
        port: 8383
    }
  }[process.env.NODE_ENV || 'development']
