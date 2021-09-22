const assert     = require('assert');
const { Model }  = require('objection');
const Knex       = require('knex');

const nodeEnv = config('env');
const knexConfig = config(`db.${nodeEnv}`);

assert(knexConfig !== null, 'Database connection configured incorrectly');

const knex = Knex(knexConfig);
Model.knex(knex);

