const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl,req.user._id)
  try {

    await product.save()

    res.redirect('/admin/products')

  } catch (err) { console.log(err) }


};


exports.getProducts = async (req, res, next) => {

  const products = await Product.fetchAll()

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });

}

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  const product = await Product.findByID(prodId)
  // -> this method gets product that has the id 

  if (!product) {
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  })



};


exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId)
  await product.update()
  console.log(product)
  res.redirect('/admin/products')
};


exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  await Product.deleteById(prodId)
  res.redirect('/admin/products');

};
