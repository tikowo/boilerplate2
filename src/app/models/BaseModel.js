const { Model, AjvValidator } = require('objection');

const { QueryBuilder } = require('objection');

class ExtendedQueryBuilder extends QueryBuilder {
    withItem() {
        return this.withGraphFetched('[item.[attributes.[attribute, option]]]')
    }
}

class BaseModel extends Model {
    static get QueryBuilder() {
        return ExtendedQueryBuilder;
    }
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

    async $afterInsert() {
        if(config('elastic.enabled') && this.elasticSearchable) {
            const [index, body, id] = this.elasticSearchable;

            let data;
            if(typeof body === 'function') {
                data = await body();
            } else {
                data = body;
            }

            const { ElasticSearchClient } = ioc;
            ElasticSearchClient.index({
                index: `${config('elastic.prefix')}-${index}`,
                body: data,
                id
            })
        }
    }
}

module.exports = BaseModel;