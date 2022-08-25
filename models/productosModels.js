const mongoose = require('mongoose');

const productoModel = mongoose.Schema({
    title:{ type: String, required:true},
    autor:{ type: String, required:true},
    img:{ type: String, required:true},
    price:{ type: Number, required:true},
    stock:{ type: Number, required:true},
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('productos', productoModel);
module.exports.productoModel = productoModel;