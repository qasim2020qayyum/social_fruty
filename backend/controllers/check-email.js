// const replaceWords = (originalText, replacements) => {
//     let modifiedText = originalText;
  
//     for (const [searchWord, replaceWord] of replacements) {
//       const regex = new RegExp(`\\b${searchWord}\\b`, "gi");
  
//       console.log("🚀 ~ file: replaceWords.js:7 ~ replaceWords ~ regex:", regex);
//       modifiedText = modifiedText.replace(regex, replaceWord);
//     }
  
//     return modifiedText;
//   };
  
//   module.exports = replaceWords;







//   const template = await emailTemplate.findOne({
//     type: "Consultation Accepted",
//   });
//   const originalText = template.text;
//   const wordReplacements = [
//     ["username", user.name],
//     ["checkoutlink", paymentLink],
//   ];
//   const emailText = replaceWords(originalText, wordReplacements);
//   await sendMail(user.email, emailText, template.subject);
// }
// if (consultation) {
//   res.json({
//     success: true,
//     message: "تم تحديث الاستشارة بنجاح",
//     paymentLink,
//     data: consultation,
//   });
// } else {
//   res
//     .status(404)
//     .json({ success: false, error: "لم يتم العثور على الاستشارة" });
// }
// } catch (error) {
// next(next);
// }





const replaceWords = (originalText, replacements) => {
    let modifiedText = originalText;
  
    for (const [searchWord, replaceWord] of replacements) {
      const regex = new RegExp(`\\b${searchWord}\\b`, "gi");
  
      console.log("🚀 ~ file: replaceWords.js:7 ~ replaceWords ~ regex:", regex);
      modifiedText = modifiedText.replace(regex, replaceWord);
    }
  
    return modifiedText;
  };
  
//   module.exports = replaceWords;








const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);




const msg = {
    to: 'test@example.com',
    from: 'test@example.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  
// function to send email
const sendMail = async (email, template, subject) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: subject,
      html: template,
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
module.exports = sendMail;