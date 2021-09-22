require('./bootstrap');
require('./services/appServiceProvider');

const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(ioc.Router);

app.listen(config('port'), () => {
    console.log(`Listening on port ${config('port')}`);
});

module.exports = app;