const mongoose  = require("mongoose");

const itemSchema = mongoose.Schema({
    name:{type:String , required:true},
    price:{type:Number , required:true},
    Category:{type:String , required:true},
    image:{type:String , required:true},
})

const itemsModel = mongoose.model('items' , itemSchema);

module.exports = itemsModel;