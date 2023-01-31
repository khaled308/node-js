import transporter from "../config/mail.js";

const sendMail = (to, subject, html) => {
  const options = {
    from: "shop@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(options, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail send successfully");
    }
  });
};

export default sendMail;
