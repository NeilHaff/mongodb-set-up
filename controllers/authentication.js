const User = require('../models/user');

exports.signup = function(req, res, next){
    // res.send({ success: 'true'});
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'needs both email and password' });
    }

    // see if a user with the email exists
    User.findOne({ email: email }, function(err, existingUser) {
        if(err){
            return next(err);
        }

    // If a user with email does exist, return an error

    if (existingUser){
        return res.status(422).send({ error:'Email is in use'});
    }

    const user = new User({
        email: email,
        password: password
    });

    user.save(function(err){
            if (err){
                return next (err);
            }

    // respond to request indicating the user was created
        res.json( { success:true } );
        });
});
}
