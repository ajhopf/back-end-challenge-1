import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    color: { type: String, required: true }
  },
  { id: false }
);

const categories = mongoose.model('categories', categorySchema);

export default categories;
