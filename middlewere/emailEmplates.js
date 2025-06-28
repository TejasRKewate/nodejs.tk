const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .container {
        max-width: 600px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        border: 1px solid #e0e0e0;
      }
      .header {
        background-color: #6a1b9a; /* Deep Purple */
        color: white;
        padding: 30px;
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .content {
        padding: 40px;
        color: #333;
        line-height: 1.8;
      }
      .verification-code {
        display: block;
        margin: 30px auto;
        font-size: 28px;
        color: #6a1b9a; /* Deep Purple */
        background: #f0e6f8;
        border: 2px dashed #6a1b9a;
        padding: 15px;
        text-align: center;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 3px;
      }
      .footer {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
        color: #777;
        font-size: 14px;
        border-top: 1px solid #e0e0e0;
      }
      p {
        margin: 0 0 20px;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Verify Your Email</div>
      <div class="content">
        <p>Hello,</p>
        <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
        <span class="verification-code">{verificationCode}</span>
        <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Community</title>
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #e6f7ff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .container {
        max-width: 650px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border: 1px solid #cce0f5;
      }
      .header {
        background-color: #1890ff; /* Blue */
        color: white;
        padding: 35px;
        text-align: center;
        font-size: 36px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .content {
        padding: 45px;
        color: #333;
        line-height: 2;
      }
      .welcome-message {
        font-size: 20px;
        margin: 30px 0;
        font-weight: 600;
      }
      .button {
        display: inline-block;
        padding: 15px 35px;
        margin: 30px 0;
        background-color: #1890ff;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #0c66c2;
      }
      .footer {
        background-color: #e6f7ff;
        padding: 25px;
        text-align: center;
        color: #777;
        font-size: 14px;
        border-top: 1px solid #cce0f5;
      }
      p {
        margin: 0 0 25px;
        font-size: 17px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 15px;
        font-size: 17px;
        padding-left: 25px;
        position: relative;
      }
      li::before {
        content: '•';
        color: #1890ff;
        font-size: 24px;
        position: absolute;
        left: 0;
        top: -3px;
      }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="header">Welcome!</div>
      <div class="content">
        <p class="welcome-message">Hello {name},</p>
        <p>We’re thrilled to have you join our community! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
        <p>Here’s how you can get started:</p>
        <ul>
          <li>Explore our features and customize your experience.</li>
          <li>Stay informed by checking out our blog for the latest updates and tips.</li>
          <li>Reach out to our support team if you have any questions or need assistance.</li>
        </ul>
        <a href="www.google.com" class="button">Get Started</a>
        <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

module.exports = { Verification_Email_Template, Welcome_Email_Template };