const bcrypt = require('bcrypt-nodejs');

function saveUser(req,res){
    User = require('../models/user');
    var testUser = new User({
        username: req.body.username,
        password: req.body.password
    });

// save user to database
    testUser.save(function(err) {
        // if (err) throw err;

        // fetch user and test password verification
        User.findOne({ username: 'jmar777' }, function(err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword('Password123', function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); // -> Password123: true
            });

            // test a failing password
            user.comparePassword('123Password', function(err, isMatch) {
                if (err) throw err;
                console.log('123Password:', isMatch); // -> 123Password: false
            });
        });

    });
    res.json("sucess");
}

function getUser(req,res){
    const User = require('../models/user');

    User.find({username : req.params.username}, function(err, user) {

        if (err) throw err;

        res.json(user);

    });
}
function getUsers(req,res){
    const User = require('../models/user');

    User.find({}, function(err, users) {

        if (err) throw err;

        res.json(users);

    });
}
function deleteUser(req,res){
    const User = require('../models/user');
    User.findOneAndRemove(
        {username : req.body.username}, function(err, todo) {
            if (err) throw err;

            res.json({info: 'Success'});

        });
}
function login(req,res){

    const User = require('../models/user');
    // const username = req.body.username;
    User.findOne({username : req.body.username}, function(err, user) {



        const isSame = user.comparePassword(req.body.password);

        res.json(isSame);

    });




}
module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers=getUsers;
module.exports.getUser = getUser;
module.exports.saveUser = saveUser;