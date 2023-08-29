const mongodb = require('mongodb')
const getDb = require('../util/database').getDb
const mongoClient = mongodb.MongoClient

class Product {
  constructor(title, price, descriton, imageUrl,userId, id) {
    this.title = title
    this.price = price
    this.descriton = descriton
    this.imageUrl = imageUrl
    this.userId = userId
    this._id = new mongodb.ObjectId(id)
  }

  async save() {
    try {
      const db = await getDb()
      const result = await db.collection('products').insertOne(this)
    }
    catch (err) {
      console.log(err)
    }
  }

  async update() {
    try {
      const db = await getDb()
      const result = await db.collection('products').updateOne({ _id: this._id }, { $set: this })

    }
    catch (err) {
      console.log(err)
    }
  }



  static async fetchAll() {
    const db = await getDb()
    const products = await db.collection('products').find().toArray()


    return products
  }

  static async findByID(prodId) {
    try {
      const db = await getDb()
      const result = await db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:", result)
      return result

    }
    catch (err) {
      console.log(err)
    }
  }

  static async deleteById(prodId) {
    const db = await getDb()
    await db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
  }


}


/*
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
*/
module.exports = Product;
