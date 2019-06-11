const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true}, //unique doent validate by querying the db but only optimizes. Hence we are using mongoose-unique-validator to validate.
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);