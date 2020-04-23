const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('http-status-codes')
const ProfileGroups = require('../models/ProfileGroups')
const checkDuplicate = (body) => {
    return ProfileGroups.findOne({ name: body.name })
}

module.exports = {
    async getProfileGroups(req, res) {
        const getProfileGroups = () => {
            return new Promise((resolve, reject) => {
                ProfileGroups.find((error, documents) => {
                    if (error) {
                        res.status(BAD_REQUEST).send(error)
                    } else {
                        res.send(documents)
                    }
                })
            })
        }
        res.send(await getProfileGroups())
    },
    async getProfileGroup(req, res) {
        const data = await ProfileGroups.findOne({ _id: req.params.id })
        res.send(data)
    },
    async saveProfileGroup(req, res) {
        const duplicate = await checkDuplicate(req.body)
        if (!duplicate) {
            ProfileGroups.create(req.body)
                .then(result => res.send(result))
                .catch(error => res.status(CREATED).send(error))
        } else {
            res.status(UNPROCESSABLE_ENTITY).send('Profile Group Already Exists with this Name')
        }
    },
    updateProfileGroup(req, res) {
        ProfileGroups.updateOne({ _id: req.params.id }, req.body, (error, document) => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.send(document)
            }
        })
    },
    deleteProfileGroup(req, res) {
        ProfileGroups.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.sendStatus(OK)
            }
        })
    }
}