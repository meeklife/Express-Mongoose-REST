const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const shopProducts = [
    {
        name: 'HP ELitebook',
        price: 100,
        category: 'Notebook'
    },
    {
        name: 'Dell Inspiron',
        price: 499,
        category: 'Laptop'
    },
    {
        name: 'M1 Air 2020',
        price: 799,
        category: 'Macbook'
    },
    {
        name: 'M2 Pro 2022',
        price: 1550,
        category: 'Macbook'
    },
    {
        name: 'Asus',
        price: 269,
        category: 'Laptop'
    },
]

Product.insertMany(shopProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })