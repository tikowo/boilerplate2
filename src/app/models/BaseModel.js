const { Model, AjvValidator } = require('objection');

class BaseModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }

    // TODO think about getting name on initialization
    static get tableName() {
        let name = this.name.split(/(?=[A-Z])/).join('_').toLowerCase();

        return name.slice(-1) !== 'y' ? name + 's' : name.slice(0, -1) + 'ies';
    }

    $formatJson(json) {
        json = super.$formatJson(json);

        if(this.hidden) {
            this.hidden.forEach(item => {
                delete json[item];
            });
        }

        return json;
    }

    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                /* Do Nothing by default */
            },
            options: {
                allErrors: true,
                validateSchema: false,
                ownProperties: true,
                v5: true,
                /* Additional options */
                useDefaults: true,
                removeAdditional: 'all'
            },
        });
    }

    $afterInsert() {
        if(config('elastic.enabled') && this.elasticSearchable) {
            const [index, body, id] = this.elasticSearchable;

            const { ElasticSearchClient } = ioc;
            ElasticSearchClient.index({
                index: `${config('elastic.prefix')}-${index}`,
                body,
                id
            })
        }
    }
}

module.exports = BaseModel;