const container = require('./container');
const config = require('./config');

global.container = container;
global.ioc = container.cradle;
global.config = config;