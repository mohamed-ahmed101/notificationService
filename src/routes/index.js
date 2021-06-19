const routes = require('./routes');
let { sendResponse } = require('../heplers/responseHandler.js');
module.exports = (app) => {

    routes.forEach(({ method, route, controller, action, middlewares = [] }) => {
        app.route(route).all(middlewares)
        [method](function (req, res, next) {
            const result = (new controller)[action](middlewares.length ? req : { ...req?.body, ...req?.query });
            // const result = (new controller)[action](middlewares.length ? req : req);
            if (result instanceof Promise) {
                result.then(result => result !== null &&
                    result !== undefined ?
                    sendResponse({ res, responseBody: result }) : undefined)
                    .catch((error) => {
                        let { serverCode, serverMsg } = error;
                        serverCode ?
                            sendResponse({ res, statusCode: serverCode, message: serverMsg }) : next(error);
                    });

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }


        })

        // app[method](route, ...(middlewares ? middlewares : {}), (req, res, next) => {
        //     console.log("req.body", req.body)
        //     const result = (new controller)[action](req.body);
        //     if (result instanceof Promise) {
        //         result.then(result => result !== null && result !== undefined ? sendResponse({ res, responseBody: result }) : undefined);

        //     } else if (result !== null && result !== undefined) {
        //         res.json(result);
        //     }
        // });
    });

}
