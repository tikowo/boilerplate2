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

  await knex('user_markets').insert([
    {
      name: 'Auto.am',
      logo: 'https://auto.am/assets/ico/fi/favicon-32x32.png',
      user_id: 1
    },
    {
      name: 'flowwers.coffee',
      logo: 'https://auto.am/assets/ico/fi/favicon-32x32.png',
      user_id: 1
    }
  ])
};