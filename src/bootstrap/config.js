const _config = require('../config');

const config = function (path) {
    try {
        let jsonpath = path.split('.');
        return jsonpath.reduce((o, n) => o[n], _config) || null
    } catch {
        return null;
    }
}

module.exports = config;

