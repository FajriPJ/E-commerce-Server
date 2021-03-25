if ( process.env.NODE_ENV === 'development') {
  require("dotenv").config()
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000

var cors = require('cors')
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res, next) => {
  res.status(200).send({message: "hello world",})
})

app.use(router)

app.use(errorHandler)

module.exports = app