const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: "jigibok392@cyclesat.com",
  from: "alexey.lisovoy2011@gmail.com",
  subject: "aaa",
  html: "<p>test</p>",
};

sgMail
  .send(mail)
  .then((res) => console.log(res))
  .catch((err) => console.log("err :>> ", err));
