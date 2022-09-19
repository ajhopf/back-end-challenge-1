import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import dotenv from 'dotenv-safe';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com banco feita com sucesso');
});

const app = express();

routes(app);

export default app;
