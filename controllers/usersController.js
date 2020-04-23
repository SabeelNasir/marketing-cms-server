const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('http-status-codes')
const Users = require('../models/Users')

module.exports = {
    async getUsers(req, res) {
        const getUsers = () => {
            return new Promise((resolve, reject) => {
                Users.find((error, documents) => {
                    if (error) {
                        res.status(BAD_REQUEST).send(error)
                    } else {
                        res.send(documents)
                    }
                })
            })
        }
        res.send(await getUsers())
    },
    saveUser(req, res) {
        Users.create(req.body)
            .then(result => res.send(result))
            .catch(error => res.status(CREATED).send(error))
    },
    updateUser(req, res) {
        Users.updateOne({ _id: req.params.id }, req.body, (error, document) => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.send(document)
            }
        })
    },
    deleteUser(req, res) {
        Users.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.sendStatus(OK)
            }
        })
    }
}