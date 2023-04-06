const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

exports.getProducts = (_, res) => {
  Product.find()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  const {productId} = req.params;
  Product.findById(productId)
    .then(product => {
      res.json(product)
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res) => {
  User.findById(req.user.userId)
    .populate('cart.items.product')
    .exec((_, user) => {
      const products = user.cart.items;
      res.json(products);
    });
};

exports.postCart = (req, res) => {
  User.findById(req.user.userId)
    .then(user => {
      return user.addToCart(req.body.productId)
    })
    .then(_ => {
      res.json({message: "Product added"})
    });
};

exports.deleteCartItem = (req, res) => {
  User.findById(req.user.userId)
    .then(user => {
      return user.deleteItemFromCart(req.params.productId)
    })
    .then(_ => {
      res.json({})
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res) => {
  (async () => {
    try {
      const user = await User.findById(req.user.userId)
        .populate('cart.items.product')
        .exec();

      const products = user.cart.items.map(i => ({
        quantity: i.quantity,
        product: { ...i.product._doc },
      }));

      const order = new Order({
        user: {
          name: user.name,
          user,
        },
        products,
      });

      await order.save();
      await user.emptyCart();

      res.json({});
    } catch (err) {
      console.log(err);
    }
  })();
};

exports.getOrders = (req, res) => {
  Order.find({ 'user.user': req.user.userId })
    .then(orders => {
      res.json(orders)
    })
    .catch(err => console.log(err));
};
