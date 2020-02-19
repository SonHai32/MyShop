const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const stringRequired = {
    type: String,
    required: true
}

const users = new Schema({
    fullname: {
        type: String,
        min: 5,
        max: 30
    },
    username: {
        ...stringRequired,
        min: 6,
        max: 30,
        unique: true
    },
    email: {
        ...stringRequired,
        max: 50,
        unique: true
    },
    password: {
        ...stringRequired,
    },
    gender: {
        type: String,
        default: "Male"
    },
    phone:{
        type: String,
        min: 3,
        max: 15
    },
    address: {
        type: String,
        max: 200
    },
    birthday: {
        type: Date,
        default: new Date(Date.now()).toISOString
    }

})

const Users = mongoose.model('Users', users);

module.exports = Users;
