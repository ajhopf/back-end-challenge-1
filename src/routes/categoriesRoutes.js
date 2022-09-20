import express from 'express';
import CategoryController from '../controllers/categoriesController.js';

const router = express.Router();

router
  .get('/categories', CategoryController.viewCategories)
  .get('/categories/:id', CategoryController.viewCategoryById)
  .get('/categories/:id/videos', CategoryController.viewCategoryVideos)
  .post('/categories', CategoryController.saveCategory)
  .put('/categories/:id', CategoryController.updateCategory)
  .delete('/categories/:id', CategoryController.deleteCategory);

export default router;
