const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = class MailAPI {
  static async send(mail) {
    try {
      return await sgMail.send(mail);
    } catch (error) {
      console.log("Error while e-mail send :>> ", error);
    }
  }
};
