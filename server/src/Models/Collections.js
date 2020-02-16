const mongoose = require ('mongoose');
const { Schema } = mongoose; 

const stringRequired = {
    type: String,
    required: true
}

const collection = new Schema({
    catalogId: stringRequired,
    name: stringRequired
},{
    timestamps: true   
})

const Collections = mongoose.model('Collections',collection);

module.exports = Collections
