const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    uniqueValidator = require('mongoose-unique-validator');

autoIncrement.initialize(mongoose.connection);

let productTypes = {values: ["mattress", "mattress-base"],  message: 'product type {VALUE} not valid'}
let Schema = mongoose.Schema;
let productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    imageUrl: {type: String, required: false},
    type: {type: String, required: false, enum: productTypes, default: 'mattress'}
});

productSchema.plugin(autoIncrement.plugin, {model: 'Product', field: 'productId'});
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema)
