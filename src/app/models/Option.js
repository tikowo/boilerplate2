const BaseModel = require('./BaseModel');

class Option extends BaseModel {
    get hidden() {
        return ['created_at', 'updated_at']
    }
}

module.exports = Option;
