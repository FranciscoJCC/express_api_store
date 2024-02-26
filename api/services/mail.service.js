const nodemailer = require('nodemailer');
const { config } = require('./../config/config');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.portEmail,
      secure: true,
      auth: {
        user: config.userEmail,
        pass: config.emailPassword,
      },
    });
  }

  async sendEmail(emailData){
    return await this.transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

  }
}

module.exports = MailService;
