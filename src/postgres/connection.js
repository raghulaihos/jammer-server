const { Client } = require('pg');

const client = new Client({
    user: 'vfesacgrieumzm',
    host: 'ec2-174-129-229-106.compute-1.amazonaws.com',
    database: 'dc68r2n8vvt2fh',
    password: '6a529675db88b95fe1861a0ec49621fb772c33361cc0e367e159e844a6fd13a3',
    port: 5432,
    ssl: true
  });

  client.connect();


  module.exports = client;
 