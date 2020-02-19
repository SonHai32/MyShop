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
    phonenumber: {
        type: Number,
        min: 3,
        max: 15
    },
    birthday:  {
        type: Date,
        default: new Date(Date.now()).toISOString()
    },
    Gender: {
        type: String,
        default: "Male"
    },
    address: {
        type: String,
        max: 300
    },
    Order:{
        type: [],
    }
})


const User = mongoose.model('Users', user)

module.exports = User;
