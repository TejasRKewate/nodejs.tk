const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String},
    phone:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    verificationCode:String,
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    opt:String,
    otpExpiresAt:Date
})

const User = mongoose.model("userAuthers",userSchema)
module.exports = User