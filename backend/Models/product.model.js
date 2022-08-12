const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: {
        type: String,
        required: false,
        minlength:1
    },
    name: {
        type: String,
        required: true,
        minlength:1
    },
    price: {
        type: Number,
        required: true,
        minlength:1
    },
    quantity: {
        type: Number,
        required: true,
        minlength:1
    },
    category_id: {
        type: Schema.ObjectId,
        required: true,
        minlength:1
    }
});

module.exports = mongoose.model('Products', productSchema);