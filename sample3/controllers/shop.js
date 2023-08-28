const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then(cart => {

      cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))

};

exports.postCart = async (req, res, next) => {

  const prodID = req.body.productId;

  try {
    const cart = await req.user.getCart();


    const products = await cart.getProducts({ where: { id: prodID } });
    let product = products.length > 0 ? products[0] : null

    if (product) {

      await product.cartItem.increment('quantity', { by: 1 })

    } else {
      const productToAdd = await Product.findByPk(prodID);
      await cart.addProduct(productToAdd, {
        through: { quantity: 1 }
      });
    }

    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.redirect('/error-page'); // Handle errors gracefully
  }

};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  const cart = await req.user.getCart()
  let product = await cart.getProducts({ where: { id: prodId } })

  await product[0].cartItem.destroy()


 /* await product.cartItem.destroy({
    where: {
      productId: prodId,
      cartId: cart.id
    }
  })*/
  res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
