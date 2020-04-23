const Sequelize = require('sequelize')
const dbOptions = require('../config/config').dbOptions
const sequelize = new Sequelize(dbOptions.database, dbOptions.username, dbOptions.password, {
    host: dbOptions.host,
    dialect: dbOptions.dialect
})
module.exports = {
    Sequelize,
    sequelize
}