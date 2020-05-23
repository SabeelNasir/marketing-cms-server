const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes')

module.exports = {
    sendBadRequestResponse(res, message) {
        res.status(BAD_REQUEST).send({
            message: message
        })
    },
    sendErrorResponse(res, error) {
        res.status(INTERNAL_SERVER_ERROR).send({
            message: error.message,
            error: error
        })
    },
    sendSuccessResponse(res, data, message = '') {
        res.status(OK).send({
            message: message,
            data: data
        })
    },

}