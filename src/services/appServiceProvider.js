const awilix = require('awilix');
if(config('elastic.enabled')) {
    const ElasticSearchClient = require('./elasticSearchService');
    container.register('ElasticSearchClient', awilix.asValue(ElasticSearchClient));
} else {
    container.register('ElasticSearchClient', awilix.asValue(null))
}