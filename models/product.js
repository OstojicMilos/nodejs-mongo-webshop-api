const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    imageUrl: String,
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Product', productSchema);

