const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complate', 'admin', '1234', {
  dialect: 'mysql',
  host: '192.168.1.56'
});

module.exports = sequelize;
