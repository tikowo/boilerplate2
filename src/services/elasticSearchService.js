const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: config('elastic.node') })

module.exports = client;