/**
    * Created by: Varun kumar
    * Date: 24 December, 2017
**/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    places: [{name: String, timestamp: Number}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;