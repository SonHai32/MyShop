const mongoose = require('mongoose');
const {Schema} = mongoose;

const stringRequired = {
    type: String,
    required: true
}
const numberRequired = {
    type: Number,
    required: true
}
const logProduction = new Schema({
    name: stringRequired,
    productId: stringRequired,
    catalogId: stringRequired,
    price: numberRequired,
    discount: Number,
    image_link: stringRequired,
    image_list: {
        type: [],
        required: true
    },
    view: Number,
},{timestamps: true

})

const LogProductions = mongoose.model('LogProductions', logProduction);

module.exports = LogProductions;
