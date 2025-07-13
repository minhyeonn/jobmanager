const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: [50, 'Name exceeds maximum characters allowed']
    },
    email:{
        type:String,
        required: [true, 'Please provide email'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            'Please provide a valid email'],
        unique: true,

    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },

});
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.comparePasswords = function(password){
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.createToken = function () {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn:'30d'});
};

module.exports = mongoose.model('User', UserSchema);