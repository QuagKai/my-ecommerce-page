const User = require('../model/user')
const bcrypt = require('bcrypt');
const setLogin = require('./setLogin');

const authRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const data = {
        name:req.body.name,
        username:req.body.username,
        password:hashedPassword
    }
    await User.insertMany([data])

    setLogin(req, res, next);

};

const authRoleVendor = (req, res, next) => {
    if(req.user.role != 1) {
        return req.send('You do not have access on this page')
    }

    next()
};

const authRoleShipper = (req, res, next) => {
    if(req.user.role != 2) {
        return req.send('You do not have access on this page')
    }

    next()
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