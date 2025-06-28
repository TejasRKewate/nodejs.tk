const express = require("express")
const {signup, cheakCode ,login,logout ,forgetPassword , resetPassword
    , verifyOtpLogin, requestOtpLogin
} = require("../controller/controller")
const router = express.Router()

router.post("/signup" , signup)
router.post("/cheakcode", cheakCode)

//Log in with email
router.post("/login" , login)
router.post("/logout" , logout)

//Forget password
router.post("/forget-password" ,forgetPassword )
router.post("/reset-password/:token", resetPassword)


//Login with phone
router.post("/requestOtpLogin" , requestOtpLogin )
router.post("/verifyOtpLogin" , verifyOtpLogin)


module.exports = router
