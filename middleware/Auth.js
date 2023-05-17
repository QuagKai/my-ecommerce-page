const User = require('../model/user')
const bcrypt = require('bcrypt');
const setLogin = require('./setLogin');

const authRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const data = {
        name:req.body.name,
        username:req.body.username,
        password:hashedPassword,
        role: req.body.role
    }
    await User.insertMany([data])

    setLogin(req, res, next);

};

const authRoleVendor = (req, res, next) => {
    if(req.session.user.role == 'vendors') {
        next()
    } else {
        res.status(400).send('You do not have vendor role to access on this page')
    }
};

const authRoleShipper = (req, res, next) => {
    if(req.session.user.role == 'shipper') {
        next()
    } else {
        res.status(400).send('You do not have shipper role to access on this page')
    }
};

const authLogin = async (req, res, next) => {
    try {
        const check = await User.findOne({
                username:req.body.username
        })
        if(bcrypt.compare(check.password, req.body.password)) {
            next()
        } else {
            res.send('Wrong password')
        }
    }
    catch {
        res.send('Wrong details')
    }
}

module.exports = {
    authRegister,
    authRoleVendor,
    authRoleShipper,
    authLogin
}