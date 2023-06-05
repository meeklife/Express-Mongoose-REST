//requiring express
const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');

//importing our mongoose model
const Product = require('./models/product')

//integrating mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}

//EJS template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//To help extract data from a post request
app.use(express.urlencoded({ extended: true }));
//using a PUT/PATCH/DELETE with HTTP
app.use(methodOverride('_method'));

//querying our product database
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})

//to create a new product 
app.get('/products/new', (req, res) => {
    res.render('products/new')
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)

})

//for product details i.e To show product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const showProduct = await Product.findById(id)
    res.render('products/show', { showProduct })
})

//updating an individual details
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${product._id}`)
})

//Deleting a Product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3001, () => {
    console.log('APP is listening on Port 3001')
})

// const categories = ['Latop', 'Notebook', 'Macbook']