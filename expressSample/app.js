const path = require('path')
const rootDir = require('./utill/path')
const express = require('express')
const bodyParser = require('body-parser')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')


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

app.use('/admin', adminData.routes)

app.use(shopRoutes)


app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle:"Page Not Found"})
})

app.listen(3000)