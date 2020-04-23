const config = require('../config/config')
const Users = require('../models/Users')
const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes')
const jwt = require('jsonwebtoken')

function signUser(payLoad) {
    return jwt.sign(payLoad.toObject(), config.authentication.jwtSecret, { expiresIn: config.authentication.TTL });
}

module.exports = {
    login(req, res) {
        Users.findOne(req.body, (error, document) => {
            if (error) {
                res.status(BAD_REQUEST).send('Invalid Credentials')
            } else {
                if (document) {
                    const token = signUser(document)
                    res.send({
                        user: document,
                        token: token
                    })
                } else {
                    res.sendStatus(UNAUTHORIZED)
                }
            }
        })
    }
}