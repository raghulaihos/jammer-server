
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../postgres/connection');
const jamcards_routes = require('./routes/jamcards');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',jamcards_routes);

app.listen(port, () => {
    console.log('Server started at port ', port);
})