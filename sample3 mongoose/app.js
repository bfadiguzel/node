async function initalize() {

    const path = require('path');
    const express = require('express');
    const bodyParser = require('body-parser');
    const errorController = require('./controllers/error');
    const mongoose = require('mongoose')

    const User = require('./models/user')

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', 'views');

    const adminRoutes = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));




    app.use(async (req, res, next) => {
        let user = await User.findById("64ee51e6f7ba97988f56ff15")
        req.user = user
        next()
    })

    app.use('/admin', adminRoutes);
    app.use(shopRoutes);

    app.use(errorController.get404);

    const connection = await mongoose.connect("mongodb+srv://bilalgsda:PXu1XjsgXNoZhqrJ@cluster0.ii673yf.mongodb.net/shop?retryWrites=true&w=majority")
    let anyUser = await User.findOne()
    if (!anyUser) {
        const user = User({
            name: 'max',
            mail: 'max@gmail.com',
            cart: {
                items: []
            }
        })

        await user.save()
    }

    //console.log(client)

    app.listen(3000)

}

initalize()