const path = require('path')
const rootDir = require('./utill/path')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const  errorController = require('./controller/error')

const app = express()

// setting promps to values
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
/*
app.use('/', (req, res, next) => {
    console.log('This allways run!')
    next() // -> it goes another middleware
})*/

app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404)

app.listen(3000)