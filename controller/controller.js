const User = require('../model/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const SECRET_KEY = "TejasKewate"
const crypto = require('crypto')
const { sendSMS, sendRegisterSms } = require("../middlewere/textOpt")
const sendCall = require("../middlewere/testCall")

const {sendEmail, WelcomeEmail} = require("../middlewere/semdEmail.jS")

const signupwithphone = async(req,res)=>{
    const {phone} =req.body
    try{
        const user = await User.findOne({phone})
        if(user){
            res.status(401).json({success:false,message:"User is already exists"})
        }
        const verificationCode  = Math.floor(100000 + Math.random() * 900000).toString()
        const newUser = User({
            phone,
            verificationCode
        })
        await newUser.save()
        const userPhone = `+91${user.phone}`; 

        await sendSMS(userPhone, otp);
        res.status(201).json({success:true,message:"Register Successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}


const signup = async(req,res)=>{
        const {name, phone, email,password} = req.body
    try {
        const existUser = await User.findOne({email})
        if(existUser) {
            return res.status(404).json({success:false,message:"User is already exist"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const verificationCode  = Math.floor(100000 + Math.random() * 900000).toString()
        const newUser = await User({
            name,
            phone,
            email,
            password:hashPassword,
           verificationCode 
        })
        await newUser.save()
        await sendCall(newUser.phone)
        console.log(verificationCode)
        await sendEmail(newUser.email, verificationCode)
        //const userPhone = `+91${newUser.phone}`; 
        //await sendSMS(userPhone, verificationCode);
        return res.status(201).json({success:true,message:"New User Added",newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"something went error"})
    }
}

const cheakCode = async(req,res) =>{
    try{
        const {code} = req.body
        const user = await User.findOne({
            verificationCode:code
        })
        if(!user) {
            return res.status(400).json({success:false,message:"Invalid or Expired code"})
        }
       
        user.isVerified=true,
        user.verificationCode=undefined
        await user.save()
        await WelcomeEmail(user.email, user.name)
        await sendRegisterSms(user.phone)
        await sendCall(user.phone)
        return res.status(201).json({success:true,message:"code is verified",user})
    }
    catch (error){
        console.log(error)
        res.status(500).json({success:false,message:"something went error"})
    }
}




const login = async(req,res) =>{
    try{
        const{email,password} = req.body
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(404).json({success:false,message:"Your credentials not found"})
        }
        if(!existUser.isVerified) {
            return res.status(404).json({success:false,message:"email is not verified! Please verify your email"})
        }
        const userPassword = await bcrypt.compare(password , existUser.password)
        if(!userPassword) {
            return res.status(401).json({success:false,message:"your password is wrong"})
        }
        const token = jwt.sign({id:existUser._id},SECRET_KEY ,{ expiresIn: "1h"})
        console.log(token)
        await existUser.save()
        return res.status(201).json({success:true,message:"Log in successfully",
        existUser,
        token:token})    
    }catch (error){
        res.status(500).json({success:false,message:"something went error"})
    }
}

const logout = async(req,res)=>{
 res.clearCookie("token")   
 return res.status(200).json({success:true, message:"Logged out successfully"})
}

const forgetPassword = async(req,res) =>{
    const {email} = req.body
    try{
        const existUSer = await User.findOne({email}) 
        if(!existUSer){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        existUSer.resetPasswordToken = resetToken
        existUSer.resetPasswordExpiresAt = resetPasswordExpiresAt

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
        console.log("Reset URL" ,resetToken)

        await existUSer.save()
        return res.status(201).json({success:true,message:"Password reset link sent to your email"})
    }
    catch (error){
        console.log(error)
        return res.status(500).json({success:false,message:"Something went wrong"})
    }
}


const resetPassword = async(req,res)=>{
    try{
        const {token} = req.params
        const {password} = req.body

        const existUser = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{ $gt: Date.now() }
        })

        if (!existUser) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}
        
        const hashPassword = await bcrypt.hash(password ,10)

        existUser.password = hashPassword
        existUser. resetPasswordToken = undefined
        existUser.resetPasswordExpiresAt=undefined

        await existUser.save()
        return res.status(201).json({success:true,message:"Password Reset SUccessfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Something went wrong"})
    }
}


const requestOtpLogin = async (req, res) => {
    const { phone } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: "Number not verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

    

        const userPhone = `+91${user.phone}`; 

        await sendSMS(userPhone, otp);
      
        return res.status(200).json({ success: true, message: "OTP sent successfully" , user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};



const verifyOtpLogin = async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const user = await User.findOne({ phone});

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        

        if (Date.now() > user.otpExpiresAt) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        user.otp = undefined;
        user.otpExpiresAt = Date.now() + 10 * 60 * 1000
        await user.save();

        console.log("Now:", Date.now());
        console.log("Expires At:", user.otpExpiresAt);
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        
        return res.status(200).json({ success: true, message: "OTP verified successfully", token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// const profile=async (req,res)=>{
// try {
//     const user = await User.findOne({email})
// } catch (error) {
//  console.log(error)   
// }
// }



module.exports = {signup,cheakCode , login , logout ,forgetPassword , resetPassword
    , verifyOtpLogin, requestOtpLogin ,signupwithphone
}