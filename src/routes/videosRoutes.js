import express from 'express';
import VideoController from '../controllers/videosController.js';

const router = express.Router();

router
  .get('/videos', VideoController.viewVideos)
  .get('/videos/:id', VideoController.viewVideoById)
  .post('/videos', VideoController.saveVideo)
  .put('/videos/:id', VideoController.updateVideo)
  .delete('/videos/:id', VideoController.deleteVideo);

export default router;
