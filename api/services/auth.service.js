const nodemailer = require("nodemailer");
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./users.service');
const { config } = require('./../config/config');

const service = new UserService();

class AuthService {
  async getUser(email, password){
    const user = await service.findByEmail(email);

    if(!user)
      throw boom.unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
      throw boom.unauthorized();

    delete user.dataValues.password;

    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, config.jwSecret);

    return {
      user,
      token
    }
  }

  async sendEmail(email){

    const user = await service.findByEmail(email);

    if(!user)
      throw boom.unauthorized();

    //Config mail
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.portEmail,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: config.userEmail,
        pass: config.emailPassword,
      },
    });


    await transporter.sendMail({
      from: '"Recuperación de cuenta 👻" <fjccandelario@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return { message: 'mail sent'};
  }
}

module.exports = AuthService;
