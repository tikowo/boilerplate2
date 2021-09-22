const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const Router = require('express').Router;
const makeRouter = () => {
    return Router();
}

container.register('ExpressRouter', awilix.asFunction(makeRouter))

container.loadModules([
    [
        './src/Router/*.js',
        {
            register: awilix.asFunction
        }
    ]
]);

module.exports = container;