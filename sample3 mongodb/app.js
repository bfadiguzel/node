async function initalize(){

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnet = require('./util/database')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

})

app.use('/admin', adminRoutes);
//app.use(shopRoutes);

app.use(errorController.get404);

const client = await mongoConnet

console.log(client)

app.listen(3000)

}

initalize()