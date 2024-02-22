const express = require('express');
const CategoryService = require('./../services/categories.service');
//Token
const passport = require('passport');
//Validators
const validatorHandler = require('./../middlewares/validatorHandler');
//Schemas
const { getCategorySchema, createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('./../schemas/category.schema');



const router = express.Router();
const service = new CategoryService();

//list of categories
router.get('/', async (req, res, next) =>{
  try {
    const categories = await service.find();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
})

//one category
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createCategorySchema, 'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const newCategory = await service.create(body);

      res.status(201).json(newCategory)
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(deleteCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);

      res.status(201).json(user.id);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
