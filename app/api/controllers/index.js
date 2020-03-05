

function saveUser(req,res){
    User = require('../models/user');
    var testUser = new User({
        username: 'jmar77',
        password: 'Password1234'
    });

// save user to database
    testUser.save(function(err) {
        if (err) throw err;

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
}

module.exports.saveUser = saveUser;