// middlewere/sendSMS.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN
const fromPhone  = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken);

const sendSMS = async (to, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your login OTP is ${otp}. It will expire in 5 minutes.`,
            from: fromPhone,
            to: to
        });
        console.log(`SMS sent to ${to}: SID ${message.sid}`);
    } catch (error) {
        console.error("Twilio SMS Error:", error.message);
        throw error;
    }
};

const sendRegisterSms = async (to,) => {
    try {
        const message = await client.messages.create({
            body: `Your register is successful`,
            from: fromPhone,
            to: to
        });
        console.log(`SMS sent to ${to}: SID ${message.sid}`);
    } catch (error) {
        console.error("Twilio SMS Error:", error.message);
        throw error;
    }
};


const whatsapppOtp = async(to , otp)=>{
    try {
    const message= client.messages.create({
            body:  `Your login OTP is ${otp}. It will expire in 5 minutes.`,
            from: 'whatsapp:+14155238886',
            contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
            contentVariables: '{"1":"12/1","2":"3pm"}',
            to: to
        })
        console.log(`SMS sent to ${to}: SID ${message.sid}`);

// .then(message => console.log(message.sid))
// .done();

    } catch (error) {
        console.error("Twilio SMS Error:", error.message);
        throw error;
    }
}

// const { sendSMS } = require("../middlewere/sendSMS");

// const otp = "123456";
// await sendSMS("+919876543210", otp); // Replace with actual number



module.exports = { sendSMS , whatsapppOtp , sendRegisterSms};
