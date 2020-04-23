const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = Schema.Types
const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    firstname: Types.String,
    lastname: Types.String,
    email: Types.String,
    password: Types.String,
    userProfile: {
        companyName: Types.String,
        companyType: Types.String,
        timeZone: Types.String
    }
})
module.exports = mongoose.model('users', userSchema, 'users')