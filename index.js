const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const Products = require('./model/products');
const port = 3000;
const MONGO_URL_K = 'mongodb+srv://K:passpass@e-commerceas1.bb89mj6.mongodb.net/?retryWrites=true&w=majority';
const errormes = 'Database Connection Failed!';
const { authRegister, authLogin, authRoleVendor, authRoleShipper } = require('./model/Auth');

//connect to mongodb
mongoose.connect(MONGO_URL_K)
.then(() => console.log('Database Connection Sucessfull!'))
.catch((error) => console.log(errormes));

//set up for ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//setup for mutler
var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if( file.mimetype === 'image/jpg'||
            file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg') {
                cb(null, 'public/images');
        } else{
            cb(new Error('not image', false))
        }
    },
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

//allow for input
app.use(express.urlencoded({extended:true}));

//sign up fuction
app.post('/signup', authRegister, (req,res) =>{
    res.render('home')
});

//log in funtion
app.post('/login', authLogin, (req, res) => {
    res.render('home')
});

app.get('/logout', (req, res) => {
    res.redirect('login');
})

//render homepage for lh:3000
app.get('/', (req, res) => {
    res.render('home');
});

//render signup page for lh:3000/signup
app.get('/signup', (req, res) => {
    res.render('signup');
});

//render login page for lh:3000/signup
app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/vendoronly', (req, res) => {
    Products.find()
    .then((product) => {
        res.render('vendoronly', {product: product});
    })
    .catch((error) => console.log('Error'));
});

app.post('/createproduct', upload.single('image'), async(req,res) => {
    const newProduct = {
        name: req.body.name,
        gender: req.body.gender,
        descrip: req.body.descrip,
        image: {
            data: req.file.filename,
            contentType: 'image/png'
        },
        price: req.body.price,
        category: req.body.category,
        size: req.body.size,
        onsale: req.body.onsale
    }

    await Products.create(newProduct)
    .then(() => res.redirect('vendoronly'))
    .catch(() => res.redirect('/'));
});

//listen to from the host
app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});