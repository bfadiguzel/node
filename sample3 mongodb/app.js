async function initalize() {

    const path = require('path');
    const express = require('express');
    const bodyParser = require('body-parser');
    const errorController = require('./controllers/error');

    const getDb = require('./util/database').getDb
    const mongoConnet = require('./util/database').mongoConnet

    const User = require('./models/user')

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', 'views');

    const adminRoutes = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
 



    app.use(async (req, res, next) => {
       let user = await User.findById("64ee12a841527fe6096c8eed")
        req.user = new User(user.name, user.email, user.cart, user._id)
        next()
    })

    app.use('/admin', adminRoutes);
    app.use(shopRoutes);

    app.use(errorController.get404);

    const client = await mongoConnet()


    //console.log(client)

    app.listen(3000)

}

initalize()