import express from 'express';
import CategoryController from '../controllers/categoriesController.js';

const router = express.Router();

router
  .get('/categories', CategoryController.viewCategories)
  .get('/categories/:id', CategoryController.viewCategoryById)
  .post('/categories', CategoryController.saveCategory)
  .delete('/categories/:id', CategoryController.deleteCategory);

export default router;
