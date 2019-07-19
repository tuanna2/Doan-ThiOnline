const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'ec2-3-15-165-79.us-east-2.compute.amazonaws.com',
      user : 'tuan',
      password : 'anhtuan9x',
      database : 'ThiOnline',
      // debug: ['ComQueryPacket']
    }
  });
module.exports = knex;