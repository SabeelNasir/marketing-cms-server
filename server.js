const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const router = require('./router/router')
const cors = require('cors')
const config = require('./config/config')
// const mongodbConnection = require('./config/mongodb')

app.use(bodyParser.json())
app.use(cors())

const router = express.Router()
router.get('/', (req, res) => {
    res.send({ message: 'success-server' })
})
app.use('/api', router);


app.listen(config.port, function () {
    console.log(`auth server listening on port : ${config.port} , env: ${process.env.NODE_ENV}`);
})