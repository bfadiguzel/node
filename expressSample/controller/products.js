
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    console.log('add product!')
    res.render('add-product', {pageTitle:"Add Product", path: '/admin/add-product'})
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop', {prods: products, pageTitle: 'My Shop', path:'/'})
    })
    

}