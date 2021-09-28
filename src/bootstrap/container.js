const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const Router = require('express').Router;
const makeRouter = () => {
    return Router();
}

const makeController = (controller) => {
    return new Proxy(controller, {
        get: function (target, prop, receiver) {
            const initial = Reflect.get(...arguments);

            return function (req, res, next) {
                return initial(...arguments).catch(e => {
                    next(e)
                })
            }
        }
    })
}

container.register('ExpressRouter', awilix.asFunction(makeRouter))
container.register('Controller', awilix.asValue(makeController))

container.loadModules([
    [
        './src/app/routes/*.js',
        {
            register: awilix.asFunction
        }
    ],
    [
        './src/app/middleware/*.js',
        {
            register: awilix.asFunction
        }
    ],
    [
        './src/app/controllers/*.js',
        {
            register: awilix.asFunction
        }
    ],
    [
        './src/app/models/*.js',
        {
            register: awilix.asValue
        }
    ]
]);

module.exports = container;