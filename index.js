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
const { Cart } = require('./model/carts');

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

app.get('/shipperhub', authRoleShipper, (req, res) => {
    res.render('shipperhub')
});

app.get('/shipperhub/storage1', authRoleShipper, (req, res) => {
    res.render('storage1')
});

app.get('/shipperhub/storage2', authRoleShipper, (req, res) => {
    res.render('storage2')
});

app.post('/signup', authRegister, (req, res) => {
    console.log(req.session)
    res.redirect('/')
});

app.get('/shippersignup', (req, res) => {
    res.render('shippersignup')
});
app.get('/vendorsignup', (req, res) => {
    res.render('vendorsignup')
});

app.post('/shippers-signup', authRegister, (req, res) => {
    res.redirect('/shipperhub')
    console.log(req.session)
});

app.post('/vendors-signup', authRegister, (req, res) => {
    res.redirect('/vendoronly')
    console.log(req.session)
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', authLogin, setLogin, (req, res) => {
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
    Products.find({onsale: "true"})
    .then((products) => {
        res.render('all-products', {products: products});
    })
    .catch((error) => console.log('Error'));
});

app.get('/vendors', (req, res) => {
    res.render('vendors')
});


app.get('/vendoronly', authRoleVendor, (req, res) => {
    Products.find({creator: req.session.user.name})
    .then((products) => {
        res.render('vendoronly', {products: products});
    })
    .catch((error) => {
        res.render('vendoronly', { products: [] })
    });
});

app.post('/createproduct', upload, createProducts, (req,res) => {
});

app.post('/editproduct/:id', upload, editProducts, (req,res) => {
});

app.get('/:id/delete', deleteProducts, (req,res) => {
});

app.get('/add-to-cart/:id', addtoCart, (req, res, next) => {
    console.log('addtoCart function loop');
    res.sendStatus(200);
  });
  
  app.get('/cart', authRoleCustomer, async (req, res) => {
        const usersession = req.session.user;
        if (!usersession) {
            return res.redirect('/login');
        }
    
        const cart = await Cart.findOneByOwnerID(usersession.id);
    
        if (cart)
            console.log('Cart exists')
        else {
            cart = new Cart({ cartOwnerID: usersession.id });
            console.log('New cart created');
        }
        return res.render('yourcart', { yourcart : cart });
        console.log('Error retrieving cart:', error);
        res.redirect('/error');
  });
  
  app.post('/update-cart', (req, res) => {
    const { productId, quantity, checkout, storage } = req.body;
  
    Cart.findOneByOwnerID(req.session.user.id)
      .then((cart) => {
        const cartItem = cart.items.find((item) => item.id.toString() === productId);

        if (cartItem) {
          cartItem.qty = quantity;
        }

        cart.Qty = cart.items.reduce((totalQty, item) => totalQty + item.qty, 0);
        cart.totalPrice = cart.items.reduce((totalPrice, item) => totalPrice + item.qty * item.price, 0);
  
        if (checkout) {
          cart.storageUpdater(storage);
          cart.checkout(true);
        }
  
        return cart.save();
      })
      .then((updatedCart) => {
        res.json({ cart: updatedCart });
      })
      .catch((error) => {
        console.error('Failed to update cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
      });
  });
    
  app.post('/update-quantity', async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      const cart = await Cart.findOneByOwnerID(req.session.user.id);
  
      await cart.updateItemQuantity(productId, quantity);
  
      res.json({ cart });
    } catch (error) {
      console.error('Failed to update quantity in the database:', error);
      res.status(500).json({ error: 'Failed to update quantity in the database' });
    }
  });  

app.get('/all-vendor', (req, res) => {
    Products.find()
    .then((product) => {
        res.render('all-vendor',{vendorProduct : product})
    })
    .catch((error) => {
        res.redirect('')
    });
});

app.get('/product/:id', (req, res) => {
    Products.findById(req.params.id)
    .then((product) => {
        res.render('details',{oneProduct : product})
    })
    .catch((error) => {
        res.redirect('/all-products')
    });
})

app.get('/vendor', (req, res) => {
    Products.find({creator: "Acne"})
    .then((products) => {
        res.render('vendor',{creatorProduct : products})
    })
    .catch((error) => {
        res.redirect('/all-vendors')
    });
})

app.get('shipperhub/storage1', (req,res) => {
    res.render('storage1')
})

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});