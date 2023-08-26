const path = require('path')
const rootDir = require('../utill/path')
const express = require('express')
const { products } = require('./admin')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(products)
    res.render('shop', {prods: products, pageTitle: 'My Shop', path:'/'})
})

module.exports = router