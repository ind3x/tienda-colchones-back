const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    uniqueValidator = require('mongoose-unique-validator');

autoIncrement.initialize(mongoose.connection);

let roles = {
    values: ["ADMIN", "USER"],
    message: 'Role {VALUE} is not valid'
}
let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String,required: true},
    role: {type: String, default: 'USER', required: true, enum: roles},
});


// Remove password from object when it export
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'userId'});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)