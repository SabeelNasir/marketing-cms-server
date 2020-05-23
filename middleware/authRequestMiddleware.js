const Joi = require('joi')
const ResponseWrapper = require('../utils/responseWrapper')
module.exports = {
    async verifyAuthRequest(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        }).required()
        Joi.validate(req.body, schema, (err) => {
            if (err) {
                ResponseWrapper.sendBadRequestResponse(res, err.details[0].message)
            } else {
                next()
            }
        })

    }
}