const mongoose = require('mongoose');
const { Schema } = mongoose;
const productos = require('./productosModels')

const carritoModel = new Schema({
    id: {type:Number, required:true},
    productos:[productos.productoModel],
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('carrito', carritoModel);