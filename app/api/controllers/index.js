const bcrypt = require('bcrypt-nodejs');
const redis = require('redis');
const client = redis.createClient();
function saveUser(req,res){
    User = require('../models/user');
    var testUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,

    });

// save user to database
    testUser.save(function(err) {
        // if (err) throw err;

        // fetch user and test password verification
        User.findOne({firstname: req.body.firstname }, function(err, user) {
            if (err) throw err;

            // test a matching password
        });

    });
    res.json("sucess");
}

function getUser(req,res){


    const User = require('../models/user');

    User.find({firstname : req.params.firstname}, function(err, user) {

        if (err) throw err;

        res.json(user);

    });
}
function getUsers(req,res){
    const User = require('../models/user');
    // console.log(req.header('Authorization'));
    const jwt = require('jsonwebtoken');
    const token = req.header('Authorization').replace('Bearer ', '');
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        User.find({}, function(err, users) {

            if (err) throw err;

            res.json(users);

        });
    }catch (e) {
        res.json("permission denied")
    }

}
function deleteUser(req,res){
    const User = require('../models/user');
    User.findOneAndRemove(
        {firstname : req.body.firstname}, function(err, user) {
            if (err) throw err;

            res.json({info: 'Success'});

        });
}
function login(req,res){

    const User = require('../models/user');
    // const username = req.body.username;
    User.findOne({firstname : req.body.firstname}, function(err, user) {



        const isSame = user.comparePassword(req.body.password);
        if (isSame){
            const jwt = require('jsonwebtoken')
            const token = jwt.sign({ _id: user._id, admin: true }, process.env.JWT_SECRET, { expiresIn: '1 week' })
            //normaly, this token is stored in an redis bdd with username and this token
            // user.token = token;
            // user.save();
            client.set(String(user._id),token);
            res.json(token);
        }else{
            res.json("isnt the same");
        }


    });




}
module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers=getUsers;
module.exports.getUser = getUser;
module.exports.saveUser = saveUser;