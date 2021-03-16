
const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.status(200).send({message: "hello world",})
})

app.use(router)

app.use(errorHandler)

module.exports = app