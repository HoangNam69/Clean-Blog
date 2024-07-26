const User = require('../models/User.js');
module.exports = async (req, res, next) => {
    const checkForExistence = await User.findById(req.session.userId);
    if (!checkForExistence) {
        return res.redirect('/');
    }
    next();
};