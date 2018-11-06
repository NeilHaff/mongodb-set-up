const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define the model below

const userSchema = new Schema({
    email:  {  type: String, unique: true, lowercase: true, useNewUrlParser: true },
    password: String
});

//Encrypt password below
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err,salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

        user.password = hash;
        next();

        });
    });

 });


//create the model class here

const ModelClass = mongoose.model('user', userSchema);


//export the model

module.exports = ModelClass;


