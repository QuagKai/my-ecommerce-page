const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const MONGO_URL_K = 'mongodb+srv://K:passpass@e-commerceas1.bb89mj6.mongodb.net/?retryWrites=true&w=majority';
const errormes = 'Database Connection Failed!';
const userSchema = require('./public/js/user');
const User = require('./public/js/user');
const { authRegister, authLogin, authRoleVendor, authRoleShipper } = require('./public/js/Auth');

//connect to mongodb
mongoose.connect(MONGO_URL_K)
.then(() => console.log('Database Connection Sucessfull!'))
.catch((error) => console.log(errormes));

//set up for ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

//listen to from the host
app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});