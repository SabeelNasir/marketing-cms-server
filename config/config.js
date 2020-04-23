const env = process.env.NODE_ENV || 'development'
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
        mongoDbConnectionString: "mongodb+srv://sabeelnasir:sabeelnasir@cluster0-yumgy.mongodb.net/marketing_cms"
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
        // mongoDbConnectionString: "mongodb://localhost:27017/marketing_cms"
        mongoDbConnectionString: "mongodb+srv://sabeelnasir:sabeelnasir@cluster0-yumgy.mongodb.net/marketing_cms"
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