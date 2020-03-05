const bcrypt = require('bcrypt-nodejs');
const redis = require("redis");
const client = redis.createClient();

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
        User.findOne({ username: req.body.username}, function(err, user) {
            if (err) throw err;
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
        if(isSame){
            client.on("error", function(error) {
                console.error(error);
            });      
            client.set(req.body.username,0, redis.print);
            client.get(req.body.username, redis.print);
        }
    });
}

module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers=getUsers;
module.exports.getUser = getUser;
module.exports.saveUser = saveUser;