const nodemailer = require("nodemailer");
const { Verification_Email_Template,  Welcome_Email_Template} = require("./emailEmplates")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "your gmail",
    pass: "your gmail app password",
  },
});


const sendEmail = async(email, verificationCode)=> {
  try {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <your@gmail.com>', 
        to: email, 
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: Verification_Email_Template.replace("{verificationCode}", verificationCode), 
      });
      console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error)
  }
  
}

const WelcomeEmail = async(email,name)=>{
  try {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <your@gmail.com>', 
        to: email, 
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: Welcome_Email_Template.replace("{name}", name), 
      });
      console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {sendEmail, WelcomeEmail}



