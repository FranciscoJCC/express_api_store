const express = require('express');
const UserService = require('../services/users.service');
//Validator
const validatorHandler = require('./../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
})

module.exports = router;

