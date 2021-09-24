const awilix = require('awilix')

const makeAuthService = require('./authService')

if(config('elastic.enabled')) {
    const ElasticSearchClient = require('./elasticSearchService');
    container.register('ElasticSearchClient', awilix.asValue(ElasticSearchClient))
} else {
    container.register('ElasticSearchClient', awilix.asValue(null))
}

container.register('AuthService', awilix.asFunction(makeAuthService).singleton())