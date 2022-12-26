const mongoose  = require("mongoose");

const billSchema = mongoose.Schema({
    customerName:{type:String , required:true},
    customerPhoneNumber:{type: Number , required: true},
    totalAmount:{type:Number , required:true},
    VAT:{type:String , required:true},
    subTotal: {type : Number , required :true},
    paymentMode : { type: String , require: true},
    cartItems : {type: Array , required: true}
  
} , {timestamps: true})

const billsModel = mongoose.model('bills' , billSchema);

module.exports = billsModel;