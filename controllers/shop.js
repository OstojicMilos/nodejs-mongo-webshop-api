const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

exports.getProducts = async (_, res) => {
  res.json(await Product.find());
};

exports.getProduct = async (req, res) => {
  const {productId} = req.params;
  res.json(await Product.findById(productId));
};

exports.getCart = (req, res) => {
  User.findById(req.user.userId)
    .populate('cart.items.product')
    .exec((_, user) => {
      const products = user.cart.items;
      res.json(products);
    });
};

exports.postCart = async (req, res) => {
  const user = await User.findById(req.user.userId);
  await user.addToCart(req.body.productId);
  res.json({message: "Product added"});
};

exports.deleteCartItem = async (req, res) => {
  const user = await User.findById(req.user.userId);
  await user.deleteItemFromCart(req.params.productId);
  res.json({});
};

exports.postOrder = async (req, res) => {
  const user = await User.findById(req.user.userId)
        .populate('cart.items.product')
        .exec();

  const products = user.cart.items.map(i => ({
    quantity: i.quantity,
    product: { ...i.product._doc },
  }));

  const order = new Order({
    user: { name: user.name, user },
    products,
  });

  await order.save();
  await user.emptyCart();

  res.json({});
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ 'user.user': req.user.userId });
  res.json(orders);
};
