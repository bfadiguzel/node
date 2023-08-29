const mongodb = require('mongodb')

const uri = "mongodb+srv://bilalgsda:PXu1XjsgXNoZhqrJ@cluster0.ii673yf.mongodb.net/?retryWrites=true&w=majority";

const MongoClient = mongodb.MongoClient;
const mongoConnet = async () => {
  const connection = await MongoClient.connect(uri) 
  console.log(connection)
  return connection
}



exports.module = mongoConnet()