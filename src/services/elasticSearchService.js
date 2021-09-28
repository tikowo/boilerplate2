const { Client } = require('@elastic/elasticsearch');

let client;
if (config('elastic.enabled')) {
    client = new Client({ node: config('elastic.node') })
} else {
    client = new Proxy({}, {
        get: function () {
            throw new Error('ElasticSearch not enabled')
        }   
    })
}

module.exports = client;