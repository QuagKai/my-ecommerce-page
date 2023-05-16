const User = require('../model/user');

const loginSet = async(req, res, next) => {
    const check = await User.findOne({
        username:req.body.username
    })
    req.session.user = {
        id: check._id.toString(),
        name: check.username,
        role: check.role
    }
    // res.send(req.session.User);
    next();
}

module.exports = loginSet