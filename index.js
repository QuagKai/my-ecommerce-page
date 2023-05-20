// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// Oriol Mole Teiga
// ID: 
// Ngo Quang Khai  (s3975831)              
// Oriol Mole Teiga (s3979344)
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo



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
const addtoCart = require('./middleware/addtoCart.js')
// const setSignup = require('./middleware/setSignup');
const { authRegister, authLogin, authRoleVendor, authRoleShipper, authRoleCustomer } = require('./middleware/Auth');
const Carts = require('./model/carts');

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
    maxAge: 20*60* 1000, // expire in 60s
    secure: false, // set false to use the cookie on local host
    httpOnly: true // for more secure
},
  store: MongoStore.create({
    mongoUrl: MONGO_URL_K, 
    ttl: 20*60 // session epxires in 60s
  })
}))


//connect to mongodb
mongoose.connect(MONGO_URL_K)
.then(() => console.log('Database Connection Sucessfull!'))
.catch((error) => console.log(errormes));

//Make route for homepage
app.get('/', (req, res) => {
    res.render('home')
});

//Make route for caontact page
app.get('/contact', (req, res) => {
    res.render('contact')
});

//This part should be remove
app.get('/details', (req, res) => {
    res.render('details')
});

//make route for signup page
app.get('/signup', (req, res) => {
    res.render('signup')
});

//Make route for shipper hub page with authentication for shippers role
app.get('/shipperhub', authRoleShipper, (req, res) => {
    res.render('shipperhub')
});
//Make route for storage1 page with authentication for shippers role
app.get('/shipperhub/storage1', authRoleShipper, (req, res) => {
    res.render('storage1')
});

//Make route for storage2 page with authentication for shippers role
app.get('/shipperhub/storage2', authRoleShipper, (req, res) => {
    res.render('storage2')
});

//Make route for signing up
app.post('/signup', authRegister, (req, res) => {
    console.log(req.session)
    res.redirect('/')
});

//Make route for shipper sign up page
app.get('/shippersignup', (req, res) => {
    res.render('shippersignup')
});

//Make route for vendor sign up page
app.get('/vendorsignup', (req, res) => {
    res.render('vendorsignup')
});

//Make route for shipper signing up
app.post('/shippers-signup', authRegister, (req, res) => {
    res.redirect('/shipperhub')
    console.log(req.session)
});

//Make route for vendor signing up
app.post('/vendors-signup', authRegister, (req, res) => {
    res.redirect('/vendoronly')
    console.log(req.session)
});

//Make route for login page
app.get('/login', (req, res) => {
    res.render('login')
});

//Make route for authentication and set current session user
app.post('/login', authLogin, setLogin, (req, res) => {
    console.log(req.session)
    res.redirect('/');
});

//Make route for loging out
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

//Make route for all-products page with loading all product
app.get('/all-products', (req, res) => {
    Products.find({onsale: "true"})
    .then((products) => {
        res.render('all-products', {products: products});
    })
    .catch((error) => console.log('Error'));
});

//This part should be remove
app.get('/vendors', (req, res) => {
    res.render('vendors')
});

//Make route for vendoronly page with wendor role authentication
app.get('/vendoronly', authRoleVendor, (req, res) => {
    Products.find({creator: req.session.user.name})
    .then((products) => {
        res.render('vendoronly', {products: products});
    })
    .catch((error) => {
        res.render('vendoronly', { products: [] })
    });
});

//Make route for creating product function
app.post('/createproduct', upload, createProducts, (req,res) => {
});

//Make route for editing product function
app.post('/editproduct/:id', upload, editProducts, (req,res) => {
});

//Make route for deleting product function
app.get('/:id/delete', deleteProducts, (req,res) => {
});

//Make route for add to cart function
app.get('/add-to-cart/:id', addtoCart, (req, res, next) => {
    console.log('addtoCart function loop');
    res.sendStatus(200);
});

//Make route for cart page
app.get('/cart', authRoleCustomer, (req,res) => {
    res.render('yourcart')
});

//Make route for listen to port
app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});

//Make route for all-vendor page and lodaing all product of that vendor
app.get('/all-vendor', (req, res) => {
    Products.find()
    .then((product) => {
        res.render('all-vendor',{vendorProduct : product})
    })
    .catch((error) => {
        res.redirect('')
    });
});

//Make route for product detail page
app.get('/product/:id', (req, res) => {
    Products.findById(req.params.id)
    .then((product) => {
        res.render('details',{oneProduct : product})
    })
    .catch((error) => {
        res.redirect('/all-products')
    });
})

//Make route for vendor page, in this case we just create one for 'Acne brand'
app.get('/vendor', (req, res) => {
    Products.find({creator: "Acne"})
    .then((products) => {
        res.render('vendor',{creatorProduct : products})
    })
    .catch((error) => {
        res.redirect('/all-vendors')
    });
})

//Make route for storage1 page
app.get('shipperhub/storage1', (req,res) => {
    res.render('storage1')
})