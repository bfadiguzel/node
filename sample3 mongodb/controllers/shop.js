const Product = require('../models/product');


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll()

    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })

  } catch (err) { console.log(err) }
};


exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  const product = await Product.findByID(prodId)

  res.render('shop/product-detail', {
    product: product,
    pageTitle: 'Shop',
    path: '/products'
  });

}

  exports.postCart = async (req, res, next) => {

    const prodID = req.body.productId;
    const product = await Product.findByID(prodID)
    await req.user.addToCart(product)
    res.redirect('/cart');
    /*
      try {
        const cart = await req.user.getCart();
    
        console.log("@@@@@@@@@@@@@: " + JSON.stringify(cart))
        const products = await cart.getProducts({ where: { id: prodID } });
        let product = products.length > 0 ? products[0] : null
    
        if (product) {
    
          await product.cartItem.increment('quantity', { by: 1 })
    
        } else {
          const productToAdd = await Product.findByPk(prodID);
          await cart.addProduct(productToAdd, {
            through: { quantity: 1 }
          });
          res.redirect('/cart');
        }
    
        
      } catch (error) {
        console.error(error);
        res.redirect('/error-page'); // Handle errors gracefully
      }
    */
  };

  exports.getCart = async (req, res, next) => {

    const cart = req.user.getCart().then(products => console.log(products))
    //console.log(cart)
    const products = cart.products
     
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
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
   })
  res.redirect('/cart')
};*/

/*
exports.postOrder = async (req, res, next) => {

  const cart = await req.user.getCart()
  const products = await cart.getProducts()
  const order = await req.user.createOrder()
 
  await products.map(product => {
    order.addProduct(product, { through: { quantity: product.cartItem.quantity } })
  })
  await cart.setProducts(null)
  res.redirect('/orders')
}

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders({include: ['products']})
  
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders:orders
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};*/
