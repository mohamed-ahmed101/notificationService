const express = require('express');
const { successHandler, errorHandler } = require('./middleware/morganLoger');
const logger = require('./logger');
const setup = require('./services/setup.js');
const {sendErrorResponse} = require('./heplers/responseHandler');
const PORT = process.env.PORT || 3000
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(successHandler);
app.use(errorHandler);

// Cors for cross origin allowance
//app.use(require('cors')())
require('./routes')(app);

//welcome route  
app.get('/',(req,res)=> res.send("welcome, notificationServices up and running"))

app.use(function (req, res) {
    finalResult = {
      'Error': 'cannot find ' + req.url,
      'message': 'Invalid Request'
    };
    res.locals.errorMessage = "Invalid Request";
    res.status(404).send(finalResult);
  });

app.use((err, req, res, next) => {
    logger.error("your server got error", err);
    sendErrorResponse({ res });
  
 });

// Setup Server
var server 
setup().then((data) => {
  logger.info("your intialization setup successfully done ")
  server= app.listen(PORT, async () => {
    logger.info(`Server Is Running On Port ${PORT}`)
  })
  //TODO: release connections of db redis,mysql
}).catch((err) => logger.error("your intialization setup failed with error : ", err))

