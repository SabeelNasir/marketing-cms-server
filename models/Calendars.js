const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    logo: String,
    name: String,
    timeZone: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: mongoose.Types.ObjectId,
    updatedAt: Date
})
module.exports = new mongoose.model('calendars', schema, 'calendars')