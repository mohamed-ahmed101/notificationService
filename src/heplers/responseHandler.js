module.exports = {
    sendResponse({ res, statusCode = 200, message = 'success', responseBody }) {
        res.status(statusCode).send({
            status: true,
            data: responseBody,
            message
        })
    },
    sendErrorResponse({ res, statusCode = 500, message = 'error', responseBody }) {
        res.status(statusCode).send({
            status: false,
            data: responseBody,
            message,
        })
    }
}
