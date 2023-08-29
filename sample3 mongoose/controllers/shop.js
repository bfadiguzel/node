const Product = require('../models/product');
const Order = require('../models/order');


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })

  } catch (err) { console.log(err) }
};


exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  const product = await Product.findById(prodId)

  res.render('shop/product-detail', {
    product: product,
    pageTitle: 'Shop',
    path: '/products'
  });

}

exports.postCart = async (req, res, next) => {

  const prodID = req.body.productId;
  const product = await Product.findById(prodID)
  await req.user.addToCart(product)
  res.redirect('/cart');

};

exports.getCart = async (req, res, next) => {

  const cart = await req.user.populate('cart.items.productId')
  console.log(cart.cart.items)
  const products = cart.cart.items

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: products
  });


};


exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  const result = await req.user.removeFromCart(prodId)

  res.redirect('/cart')
};

exports.postOrder = async (req, res, next) => {
  const cart = await req.user.populate('cart.items.productId')
  console.log(cart.cart.items)
  const products = cart.cart.items.map(i => {
    return { quantity: i.quantity, product: { ...i.productId._doc } } // productId is not a id it isa sorted object from populate so it has a product object
  })

  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user
    },
    products: products
  })
  await order.save()

  await cart.clearCart()

  res.redirect('/orders')
}

exports.getOrders = async (req, res, next) => {
  const orders =await Order.find({ "user.userId": req.user._id })

  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders: orders
  });
};


/*
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






/*




exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};*/
