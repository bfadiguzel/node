const Sequelize = require('sequelize');

const sequelize = new Sequelize('u364037405_node', 'u364037405_node', 'Abc12345.', {
  dialect: 'mysql',
  host: '141.136.43.1'
});

module.exports = sequelize;
