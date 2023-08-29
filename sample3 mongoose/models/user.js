const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  cart: {
    items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true } }]
  }
})

userSchema.methods.addToCart = async function (product) {

  let cartProductIndex = this.cart.items.findIndex(cp => {
    return JSON.stringify(cp.productId) == JSON.stringify(product._id)
  })


  let quantityValue = 1
  let updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    quantityValue = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItems[cartProductIndex].quantity = quantityValue
  }
  else {
    updatedCartItems.push({ productId: product._id, quantity: quantityValue })
  }



  const updatedCart = { items: updatedCartItems }
  this.cart = updatedCart

  await this.save()

}

userSchema.methods.clearCart = async function(){
  this.cart.items = []
  await this.save()
}


userSchema.methods.removeFromCart = async function(productId){
  const updatedCartItem = this.cart.items.filter(item=>{
    return JSON.stringify(item.productId) !== JSON.stringify(productId)
  })
  this.cart.items = updatedCartItem
  await this.save()
}





module.exports = mongoose.model('User', userSchema)


/*const mongodb = require('mongodb')
const getDb = require('../util/database').getDb
const mongoClient = mongodb.MongoClient

class User {
  constructor(username, email, cart, id) {
    this.name = username
    this.email = email
    this.cart = cart
    this._id = id
  }

  async save() {

    const db = await getDb()
    const result = await db.collection('users').insertOne(this)

  }

  async addToCart(product) {

    let cartProductIndex = -1
    if (this.cart != null) {

      cartProductIndex = this.cart.items.findIndex(cp => {
        return JSON.stringify(cp.productId) == JSON.stringify(product._id)
      })
    }



    let quantityValue = 1
    let updatedCartItems = [];
    if (this.cart != null) {

      updatedCartItems = [...this.cart.items]
      console.log("asd: ", cartProductIndex)
      if (cartProductIndex >= 0) {

        console.log(cartProductIndex)
        console.log(this.cart.items[cartProductIndex].quantity)
        quantityValue = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = quantityValue
      } else {

        updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: quantityValue })
      }

    } else {

      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: quantityValue })
    }




    const updatedCart = { items: updatedCartItems }
    const db = await getDb()

    await db.collection('users').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    )

  }


  static async fetchAll() {
    const db = await getDb()
    return await db.collection('users').find().toArray()
  }
  async getCart() {
    const db = await getDb()
    const productsIds = this.cart.items.map(i => {
      return i.productId
    })
    const products = await db.collection('products').find({ _id: { $in: productsIds } }).toArray()
    products.map(p => {
      return {
        ...p, quantity: this.cart.items.find(i => {
          return JSON.stringify(i.productId) == JSON.stringify(p._id)
        }).quantity
      }
    })
  }
  static async findById(userId) {
    const db = await getDb()
    return await db.collection('users').find({ _id: new mongodb.ObjectId(userId) }).next()
  }

}*/
//module.exports = User