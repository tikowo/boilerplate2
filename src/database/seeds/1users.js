const faker = require('faker');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  const hash = await bcrypt.hash('password', 10);

  await knex('users').insert([
    {
      name: faker.internet.userName(),
      // email: faker.internet.email(),
      // password: faker.internet.password()
      email: 'tiko@gmail.com',
      password: hash
    },
  ]);
};