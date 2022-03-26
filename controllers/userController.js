const User = require('../model/userSchema');

exports.getHomepage = (req, res) => {
    res.json(200, { message: 'Welcome to the homepage' });
};

exports.postCreateUser = (req, res) => {
    User.create(req.body)
    .then(user => {
        res.json(201, { message: 'User created successfully', user });
    }).catch(err => {
        res.json(500, { message: 'Something went wrong', err });
    })
};