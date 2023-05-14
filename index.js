const express = require('express');
const upload = require('./middleware/uploadImage');
const createProducts = require('./middleware/uploadProducts');
const mongoose = require('mongoose');
const Products = require('./model/products');
const app = express();
const port = 3000;
const MONGO_URL_K = 'mongodb+srv://K:passpass@e-commerceas1.bb89mj6.mongodb.net/?retryWrites=true&w=majority';
const errormes = 'Database Connection Failed!';
const { authRegister, authLogin, authRoleVendor, authRoleShipper } = require('./middleware/Auth');

//set up for ejs and express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//connect to mongodb
mongoose.connect(MONGO_URL_K)
.then(() => console.log('Database Connection Sucessfull!'))
.catch((error) => console.log(errormes));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/details', (req, res) => {
    res.render('details')
});

app.get('/signup', (req, res) => {
    res.render('signup')
});

app.get('/all-products', (req, res) => {
    res.render('all-products')
});



app.get('/vendoronly', (req, res) => {
    Products.find()
    .then((products) => {
        res.render('vendoronly', {products: products});
    })
    .catch((error) => console.log('Error'));
});

app.post('/createproduct', upload, createProducts, (req,res) => {
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});