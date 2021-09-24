require('./bootstrap');
require('./services/appServiceProvider');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: config('cors.origin'),
    maxAge: config('cors.maxAge')
}))

app.use(express.urlencoded({
    extended: false
}));

app.use(ioc.Router);

app.listen(config('port'), () => {
    console.log(`Listening on port ${config('port')}`);
});

module.exports = app;