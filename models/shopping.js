const mongoose = require("mongoose");
const ShopingCartSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: [true,"El nombre del usuario es requerido"]
    },
    status:{
        type: String,
        required: [true,"El Status es requerido"]
    },
    productsName:{
        type: Object,
        required: [true,"El Nombre del producto es requerido"]
    }
});
const Shoping = mongoose.model("Shoping", ShopingCartSchema);
module.exports = Shoping;