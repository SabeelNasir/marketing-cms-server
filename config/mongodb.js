const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.connect(config.dbOptions.mongoDbConnectionString, err => {
    if (err) {
        console.log('mongodb connection failed')
    } else {
        console.log('mongodb connected')
    }
})