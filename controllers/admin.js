const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  const product = new Product({ ...req.body, user: req.user._id });
  await product.save(req.body);
  res.status(201).json(product);
};

exports.editProduct = async ({body}, res) => {
  const { _id: productId, title, price, imageUrl, description } = body;

  const product = await Product.findById(productId);
  product.title = title;
  product.price = price;
  product.imageUrl = imageUrl;
  product.description = description;
  await product.save()
  res.status(200).json(product);  
};

exports.deleteProduct = async (req, res) => {
  const {productId} = req.params;
  await Product.findByIdAndDelete(productId);
  res.json({ message: `Product with the id of ${productId} has been deleted`});
};
