import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';

dotenv.config();

const mongodb = process.env.MONGODB_URI;

console.log(mongodb);

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => console.log(error));

let db = mongoose.connection;

export default db;
