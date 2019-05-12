const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'tuantuan',
      database : 'ThiOnline',
      port:3306,
      // debug: ['ComQueryPacket']
    }
  });
module.exports = knex;