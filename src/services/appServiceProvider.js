const awilix = require('awilix')

const makeAuthService = require('./authService')

const ElasticSearchClient = require('./elasticSearchService');
container.register('ElasticSearchClient', awilix.asValue(ElasticSearchClient));

container.register('AuthService', awilix.asFunction(makeAuthService).singleton())