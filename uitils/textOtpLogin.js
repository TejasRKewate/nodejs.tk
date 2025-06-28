const { sendSMS } = require("../middlewere/sendSMS")

const requestOtpLogin = async (req, res) => {
    const { phone } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: "Email not verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        // Send OTP via SMS or email
        await sendSMS(user.phone, otp); // assuming `phone` is in user schema

        return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const verifyOtpLogin = async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const user = await User.findOne({ phone });

        if (!user || user.otp !== otp || Date.now() > user.otpExpiresAt) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ success: true, message: "OTP verified successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
