const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    ageRange: Array,
    gender: Array,
    location: {
        city: String,
        country: String
    },
    language: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: mongoose.Types.ObjectId,
    updatedAt: Date
})
module.exports = new mongoose.model('profile_groups', schema, 'profile_group')