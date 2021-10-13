const express = require ('express');
const app = express();
const cors = require('cors');
const cookieParser = require ("cookie-parser");
const bodyParser = require('body-parser')
const connectDB = require ("./db/database");
const routes = require('./api/routes/router');

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', routes);
app.use(function handleNotFound(req, res, next) {
    res.status(404);
    res.json({
        error: 'Routes Not found'
    });
});

app.listen(5000, function () {
    console.log(`server started....5000`,);
});
