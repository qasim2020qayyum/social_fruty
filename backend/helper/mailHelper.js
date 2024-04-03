const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function to send email
const sendMail = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: 'Otp for Register in Fruit Auction',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>ProUI Email Template - Welcome</title>
              <meta name="viewport" content="width=device-width" />
             <style type="text/css">
                  @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
                      body[yahoo] .buttonwrapper { background-color: transparent !important; }
                      body[yahoo] .button { padding: 0 !important; }
                      body[yahoo] .button a { background-color: #148e81; padding: 15px 25px !important; }
                  }
  
                  @media only screen and (min-device-width: 601px) {
                      .content { width: 600px !important; }
                      .col387 { width: 387px !important; }
                  }
              </style>
          </head>
          <body bgcolor="#352738" style="margin: 0; padding: 0;" yahoo="fix">
              <!--[if (gte mso 9)|(IE)]>
              <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
              <![endif]-->
              <table align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;" class="content">
                  <tr>
                      <td style="padding: 15px 10px 15px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td align="center" style="color: #aaaaaa; font-family: Arial, sans-serif; font-size: 12px;">
                                      Email not displaying correctly?  <a href="#" style="color: #148e81;">View it in your browser</a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td align="center" bgcolor="#148e81" style="padding: 20px 20px 20px 20px; color: #ffffff; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold;">
                          <h1>Fruit Auction</h1>
                      </td>
                  </tr>
                  <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 40px 20px 40px 20px; color: #555555; font-family: Arial, sans-serif; font-size: 20px; line-height: 30px; border-bottom: 1px solid #f6f6f6;">
                          <b>Your OTP for Fruit Auction is</b>
                      </td>
                  </tr>
                  <tr>
                      <td align="center" bgcolor="#f9f9f9" style="padding: 20px 20px 0 20px; color: #555555; font-family: Arial, sans-serif; font-size: 20px; line-height: 30px;">
                          <b>Account:</b> ${email}
                      </td>
                  </tr>
                  <tr>
                      <td align="center" bgcolor="#f9f9f9" style="padding: 30px 20px 30px 20px; font-family: Arial, sans-serif; border-bottom: 1px solid #f6f6f6;">
                          <table bgcolor="#148e81" border="0" cellspacing="0" cellpadding="0" class="buttonwrapper">
                              <tr>
                                  <td align="center" height="50" style=" padding: 0 25px 0 25px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;" class="button">
                                      <a href="#" style="color: #ffffff; text-align: center; text-decoration: none;">${otp}</a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="center" bgcolor="#dddddd" style="padding: 15px 10px 15px 10px; color: #555555; font-family: Arial, sans-serif; font-size: 12px; line-height: 18px;">
                          <b>Fruit Auction.</b><br/>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 15px 10px 15px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td align="center" width="100%" style="color: #999999; font-family: Arial, sans-serif; font-size: 12px;">
                                      2013-14 &copy; <a href="https://1.envato.market/x4R" style="color: #148e81;">Fruit Auction</a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                      </td>
                  </tr>
              </table>
              <![endif]--></body></html>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
        return true;
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        return false;
      });
  } catch (error) {
    return false;
  }
};

const generateOTP = (length) => {
  const characters = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    OTP += characters.charAt(randomIndex);
  }

  return OTP;
};

module.exports = { sendMail, generateOTP };
