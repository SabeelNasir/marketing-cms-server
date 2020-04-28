const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { UNAUTHORIZED } = require('http-status-codes')
module.exports = (req, res, next) => {
    // const bearerToken = req.headers['authorization']
    const authCookie = req.headers['cookie']
    try {
        if (typeof authCookie != "undefined") {
            // const token = bearerToken.split(' ')[1]
            const token = authCookie.split('access_token=')[1]
            if (token) {
                req.token = token
                jwt.verify(token, config.authentication.jwtSecret, (error, user) => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        req.session.user = user
                        next()
                    }
                })
            } else {
                throw new Error()
            }
        } else {
            throw new Error()
        }
    } catch (error) {
        res.sendStatus(UNAUTHORIZED)
    }
}