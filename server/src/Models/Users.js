const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stringRequired = {
    type: String,
    required : true
}

const user = new Schema({
    fullname: String,
    username: {
        ...stringRequired,
        min: [6, 'username must be 6 - 20 character'],
        max: [20, 'username must be 6 - 20 character'],
        unique: true
    },
    email: {
        ...stringRequired,
        min: 5,
        max: 30,
        unique: true
    },
    password: {
        ...stringRequired,
    },
    phonenumber: Number,
    birthday: Date,
    Gender: String,
    address: String
})


const User = mongoose.model('Users', user)

module.exports = User;
