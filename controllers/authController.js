const config = require('../config/config')
const Users = require('../models/Users')
const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const ResponseWrapper = require('../utils/responseWrapper')

function signUser(payLoad) {
    return jwt.sign(payLoad, config.authentication.jwtSecret, {
        expiresIn: config.authentication.TTL
    });
}

module.exports = {
    login(req, res) {
        const hashPass = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest("hex")
            console.log(hashPass)
        Users.findOne({ email: req.body.email, password: hashPass }, (error, document) => {
            if (error) {
                ResponseWrapper.sendBadRequestResponse(res, 'Invalid Credentials')
            } else {
                if (document) {
                    const obj = document.toObject()
                    delete obj['password']
                    const token = signUser(obj)
                    res.cookie(config.authentication.cookieName, token, {
                        maxAge: config.sessionOptions.cookie.maxAge,
                        httpOnly: true
                    })
                        .send({
                            user: obj,
                            token: token
                        })
                } else {
                    ResponseWrapper.sendBadRequestResponse(res, 'Invalid Credentials')
                }
            }
        })
    },
    logout(req, res) {
        req.session.destroy((error) => {
            if (error) {
                res.status(400).send(error)
            }
            res.sendStatus(OK)
        })
    }
}