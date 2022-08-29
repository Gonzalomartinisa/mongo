const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoModel = new Schema({
    title:{ type: String, required:true},
    autor:{ type: String, required:true},
    img:{ type: String, required:true},
    price:{ type: Number, required:true},
    stock:{ type: Number, required:true},
},{
    timestamps: true,
    versionKey: false
});

module.exports.model = mongoose.model('productos', productoModel);
module.exports.productoModel = productoModel;