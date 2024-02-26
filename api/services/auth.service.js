const nodemailer = require("nodemailer");
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./users.service');
const MailService = require('./mail.service');
const { config } = require('./../config/config');

const service = new UserService();
const mailService = new MailService();

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

  async sendRecovery(email){
    const user = await service.findByEmail(email);

    if(!user)
      throw boom.unauthorized();


    //Generamos un token
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwSecret, { expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;

    //Guardamos el token en la bdd
    await service.update(user.id, { recoveryToken: token});

    const mail = {
      from: '"Recuperación de cuenta 👻" <fjccandelario@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recuperación de contraseña", // Subject line
      //text: "Hello world?", // plain text body
      html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`, // html body
    }

    //const response = await this.sendEmail(mail);
    const response = await mailService.sendEmail(mail);

    return response;
  }

 /*  async sendEmail(infoEmail){

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


    await transporter.sendMail(infoEmail);

    return { message: 'mail sent'};
  } */
}

module.exports = AuthService;
