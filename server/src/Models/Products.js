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
const product = new Schema({
    name: stringRequired,
    productId: {
        ...stringRequired,
        unique: true
    },
    collectionId: stringRequired,
    price: numberRequired,
    discount: Number,
    image_link: stringRequired,
    image_list: {
        type: [{
            type: String,
        }],
        required: true
    },
    view:{
        type: Number,
        default: 0
    },
},{timestamps: true

})

const Products = mongoose.model('Products', product);

module.exports = Products;
