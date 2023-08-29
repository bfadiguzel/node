const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

class Product{
  constructor(title, price, descriton, imageUrl){
    this.title = title
    this.price = price
    this.descriton = descriton
    this.imageUrl = imageUrl
  }

  save(){

  }
}

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
