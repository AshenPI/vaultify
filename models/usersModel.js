const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String , required:true},
    password:{type:String , required:true},
    userId:{type:String , required:true},
    verified:{type: Boolean , required: true}
} , {timestamps: true})

const usersModel = mongoose.model('users' , userSchema);

module.exports = usersModel;