const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_SENDER, HOST, PORT, VERIFY_ROUTE } =
  process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = class MailAPI {
  constructor(user) {
    console.log("user :>> ", user);
    this.to = user.email;
    this.verificationToken = user.verificationToken;
  }

  async send(body) {
    console.log("this.to :>> ", this.to);
    const emailConfig = {
      to: this.to,
      from: EMAIL_SENDER,
      subject: body.subject,
      html: body.html,
    };

    try {
      return await sgMail.send(emailConfig);
    } catch (error) {
      console.log("Error while e-mail send :>> ", error);
      return error;
    }
  }

  async sendVerifyToken() {
    const mailBody = {
      subject: "E-mail confirmation letter",
      html: `<a target="_blank" href="${HOST}:${PORT}${VERIFY_ROUTE}/${this.verificationToken}">Click to confirm Your e-mail</a>`,
    };

    await this.send(mailBody);
  }
};
