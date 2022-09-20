import express from 'express';
import CategoryController from '../controllers/categoriesController.js';

const router = express.Router();

router
  .get('/categories', CategoryController.viewCategories)
  .post('/categories', CategoryController.saveCategory);

export default router;
