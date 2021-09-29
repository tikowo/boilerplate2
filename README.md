## installation
    npm i
    cp .env.example .env

#### Run for development

    npm run dev

#### Run for production
?

#### Configuration
##### env variables

    nano .env

##### app variables

    nano ./src/config/index.js

#### Adding routes

    cp ./src/Router/ExampleRoutes.js ./src/Router/NameRoutes.js

then register router in  `./src/Router/Router.js` like shown

    module.exports = makeRouter = ({ ExpressRouter, NameRoutes }) => {
        ExpressRouter.use('/name', NameRoutes);
        return ExpressRouter;
    }

#### TODO

    validators are antipattern, rework
    sync Item events with i don't know what
    add grouping to categories
