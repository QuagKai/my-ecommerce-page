//require libraries
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');

//require middleware
const upload = require('./middleware/uploadImage');
const createProducts = require('./middleware/uploadProducts');
const editProducts = require('./middleware/updateProducts');
const deleteProducts = require('./middleware/deleteProducts');
const Products = require('./model/products');
const User = require('./model/user');
const setLogin = require('./middleware/setLogin');
// const setSignup = require('./middleware/setSignup');
const { authRegister, authLogin, authRoleVendor, authRoleShipper } = require('./middleware/Auth');

//set up for mongoose
const port = 3000;
const MONGO_URL_K = 'mongodb+srv://K:passpass@e-commerceas1.bb89mj6.mongodb.net/?retryWrites=true&w=majority';

//other variables
const errormes = 'Database Connection Failed!';

//set up for ejs and express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//set up for express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'WebProgrammingAs2',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 20* 1000, // expire in 20s
    secure: false, // set false to use the cookie on local host
    httpOnly: true // for more secure
},
  store: MongoStore.create({
    mongoUrl: MONGO_URL_K, 
    ttl: 60 // session epxires in 60s
  })
}))


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

app.post('/signup', authRegister, (req, res) => {
    console.log(req.session)
    res.redirect('/')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', setLogin, authLogin, (req, res) => {
    console.log(req.session)
    res.redirect('/');
});

app.get('/logout', (req, res, next) => {
    req.session.user = null
    req.session.save((err) => {
        if (err) next(err)
        req.session.regenerate((err) => {
        if (err) next(err)
        res.redirect('/')
        })
    })
});

app.get('/all-products', (req, res) => {
    res.render('all-products')
});

app.get('/vendors', (req, res) => {
    res.render('vendors')
});


app.get('/vendoronly', (req, res) => {
    // {creator: req.session.user.name}
    Products.find()
    .then((products) => {
        res.render('vendoronly', {products: products});
    })
    .catch((error) => console.log('Error'));
});

app.post('/createproduct', upload, createProducts, (req,res) => {
});

app.post('/editproduct/:id', upload, editProducts, (req,res) => {
});

app.get('/:id/delete', deleteProducts, (req,res) => {
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});