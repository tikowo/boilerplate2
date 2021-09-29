const awilix = require('awilix')

const makeAuthService = require('./authService');
const ElasticSearchClient = require('./elasticSearchService');
const makeItemService = require('./itemService');

container.register('ElasticSearchClient', awilix.asValue(ElasticSearchClient));
container.register('AuthService', awilix.asFunction(makeAuthService).singleton())
container.register('ItemService', awilix.asFunction(makeItemService).singleton())