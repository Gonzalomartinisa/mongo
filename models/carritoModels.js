const mongoose = require('mongoose');
const productos = require('./productosModels')

const carritoModel = mongoose.Schema({
    productos:{type: String},
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('carrito', carritoModel);