const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validatorHandler = require('./../middlewares/validatorHandler');
const { recoverySchema } = require('./../schemas/auth.schema');
const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const response = await service.sendEmail(email);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
