const { ALLOWED_ORIGIN } = require('./index.json')
const env = process.env.NODE_ENV || 'development'
const dbConnStr = process.env.DB_CONN || "mongodb://localhost:27017/marketing_cms"
const jwtSecret = process.env.JWT_SECRET || "jwtSecret"
const cookieExpiry = 1 * (60 * (60 * 1000))   // 1 hour // expressed in milliseconds
const corsOptions = {
    origin: ALLOWED_ORIGIN.push("http://localhost:" + process.env.PORT),
    credentials: true           // Allow cookie to add automatically in request-headers from client //
}

/* ENV wise configurations */
const development = {
    authentication: {
        jwtSecret: jwtSecret,
        TTL: cookieExpiry / 1000, // expressed in seconds
        cookieName: 'access_token'
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
        cookie: {
            secure: true,
            maxAge: cookieExpiry,
        }
    },
    corsOptions: corsOptions
}
const production = {
    authentication: {
        jwtSecret: jwtSecret,
        TTL: cookieExpiry / 1000, // expressed in seconds
        cookieName: 'access_token'
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
        cookie: {
            secure: true,
            maxAge: cookieExpiry,
        }
    },
    corsOptions: corsOptions
}
/* ------- */

const config = {
    development,
    production
}
module.exports = config[env]