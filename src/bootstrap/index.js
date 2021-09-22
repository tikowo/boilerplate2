require('./globals');

const app = require('./express');

app.use(ioc.Router);

app.listen(config('port'), () => {
    console.log(`Listening on port ${config('port')}`);
});