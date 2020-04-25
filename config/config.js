const env = process.env.NODE_ENV || 'development'
const dbConnStr = process.env.DB_CONN || "mongodb://localhost:27017/marketing_cms"
const development = {
    authentication: {
        jwtSecret: 'jwtSecret',
        TTL: 3600 * 2
    },
    dbOptions: {
        database: 'marketing_cms',
        host: 'localhost',
        username: 'root',
        password: '',
        dialect: 'mysql',
        mongoDbConnectionString: dbConnStr
    },
    port: 3000,
    sessionOptions: {
        secret: 'marketing-cms',
        resave: 'false',
        saveUninitialized: 'false',
        cookie: {}
    }
}
const production = {
    authentication: {
        jwtSecret: 'jwtSecret',
        TTL: 3600 * 2
    },
    dbOptions: {
        database: 'marketing_cms',
        host: 'localhost',
        username: 'root',
        password: '',
        dialect: 'mysql',
        mongoDbConnectionString: dbConnStr
    },
    port: process.env.PORT || 3000,
    sessionOptions: {
        secret: 'marketing-cms',
        resave: 'false',
        saveUninitialized: 'false',
        cookie: {}
    }
}
const config = {
    development,
    production
}
module.exports = config[env]