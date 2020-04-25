const { CREATED, OK, UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('http-status-codes')
const Calendars = require('../models/Calendars')
const checkDuplicate = (body) => {
    return Calendars.findOne({ name: body.name })
}

module.exports = {
    async getCalendars(req, res) {
        const getCalendars = () => {
            return new Promise((resolve, reject) => {
                Calendars.find((error, documents) => {
                    if (error) {
                        res.status(BAD_REQUEST).send(error)
                    } else {
                        res.send(documents)
                    }
                })
            })
        }
        res.send(await getCalendars())
    },
    async getCalendar(req, res) {
        const data = await Calendars.findOne({ _id: req.params.id })
        res.send(data)
    },
    async saveCalendar(req, res) {
        const duplicate = await checkDuplicate(req.body)
        if (!duplicate) {
            Calendars.create(req.body)
                .then(result => res.send(result))
                .catch(error => res.status(CREATED).send(error))
        } else {
            res.status(UNPROCESSABLE_ENTITY).send('Calendar Already Exists with this Name')
        }
    },
    updateCalendar(req, res) {
        Calendars.updateOne({ _id: req.params.id }, req.body, (error, document) => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.send(document)
            }
        })
    },
    deleteCalendar(req, res) {
        Calendars.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                res.status(UNPROCESSABLE_ENTITY).send(error)
            } else {
                res.sendStatus(OK)
            }
        })
    }
}