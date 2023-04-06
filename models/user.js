const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

userSchema.methods.addToCart = function(productId) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.product.toString() === productId;
    });

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ product: productId, quantity: 1 });
    }

    this.cart = { items: updatedCartItems };
    return this.save();
}

userSchema.methods.deleteItemFromCart = function(productId) {
    this.cart.items = this.cart.items.filter(item => {
        return item.product.toString() !== productId.toString();
    });
    return this.save();
}

userSchema.methods.emptyCart = function() {
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
