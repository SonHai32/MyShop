const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const stringRequired = {
    type: String,
    required: true
}

const users = new Schema({
    fullname: {
        ...stringRequired,
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
    }

})

const Users = mongoose.model('Users', users);

module.exports = Users;
