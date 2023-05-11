const User = require('./user')

const authRegister = async (req, res, next) => {
    const data = {
        name:req.body.name,
        username:req.body.username,
        password:req.body.password
    }
    await User.insertMany([data])
    next()

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
        if(check.password === req.body.password) {
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