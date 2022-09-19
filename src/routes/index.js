import express from 'express';
import videos from './videosRoutes.js';

const routes = app => {
  app.route('/').get((req, res) => {
    res.status(200).send({ message: 'aluraflix' });
  });

  app.use(express.json(), videos);
};

export default routes;
