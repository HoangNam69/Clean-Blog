const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
                console.log('Password is incorrect');
            }
        } else {
            res.redirect('/auth/login');
            console.log('User not found');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/auth/login');
    }
}