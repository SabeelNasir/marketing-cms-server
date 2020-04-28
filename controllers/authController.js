const config = require('../config/config')
const Users = require('../models/Users')
const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes')
const jwt = require('jsonwebtoken')

function signUser(payLoad) {
    return jwt.sign(payLoad, config.authentication.jwtSecret, {
        expiresIn: config.authentication.TTL
    });
}

module.exports = {
    login(req, res) {
        Users.findOne(req.body, (error, document) => {
            if (error) {
                res.status(BAD_REQUEST).send('Invalid Credentials')
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
                    res.sendStatus(UNAUTHORIZED)
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