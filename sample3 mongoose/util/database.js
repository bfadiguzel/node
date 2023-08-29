const mongodb = require('mongodb')

const uri = "mongodb+srv://bilalgsda:PXu1XjsgXNoZhqrJ@cluster0.ii673yf.mongodb.net/shop?retryWrites=true&w=majority";
let _db;

const MongoClient = mongodb.MongoClient;
const mongoConnet = async () => {
  const connection = await MongoClient.connect(uri) 
  _db = await connection.db()
  return connection
}

const getDb = async () => {
  if(_db){
    return _db
  }
  throw "Np database found!"
}



exports.mongoConnet = mongoConnet
exports.getDb = getDb