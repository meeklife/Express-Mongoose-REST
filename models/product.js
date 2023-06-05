const mongoose = require('mongoose');

//defining our Schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Notebook', 'Macbook', 'Laptop']
    }
})

//compile our Schema into a model
const Product = mongoose.model('Product', productSchema);

//export it from this file
module.exports = Product;