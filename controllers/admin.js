const Product = require('../models/product');

exports.addProduct = (req, res) => {
  const product = new Product({ ...req.body, user: req.user._id });
  product
    .save(req.body)
    .then(() => {
      res.status(201).json(product);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  const productId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(productId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    product
    .save()
    .then(() => {
      res.status(200).json(product);
    })
    .catch(err => console.log(err));
  });  
};

exports.deleteProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findByIdAndDelete(productId)
    .then(() => {
      res.json({ message: `Product with the id of ${productId} has been deleted`});
    })
    .catch(err => console.log(err));
};
