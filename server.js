const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/router')
const cors = require('cors')
const session = require('express-session')
const config = require('./config/config')
const mongodbConnection = require('./config/mongodb')

app.use(bodyParser.json())
app.use(cors())
app.use(session(config.sessionOptions))
app.use('/api', router);


app.listen(config.port, function () {
    console.log(`auth server listening on port : ${config.port}`);
})