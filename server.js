const express = require('express');
const app = express();
const router = require('./router/router')
const cors = require('cors')
const session = require('express-session')
const config = require('./config/config')
const mongodbConnection = require('./config/mongodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(config.corsOptions))
app.use(session(config.sessionOptions))
app.use('/api', router);


app.listen(config.port, function () {
    console.log(`auth server listening on port : ${config.port} , env: ${process.env.NODE_ENV}`);
})