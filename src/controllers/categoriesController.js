import categories from '../models/Category.js';

class CategoryController {
  static viewCategories = (req, res) => {
    categories.find({}, (err, categories) => {
      if (err) {
        res.status(500).send({ message: 'erro no servidor' });
      } else {
        res.status(200).json(categories);
      }
    });
  };

  static saveCategory = (req, res) => {
    let category = new categories(req.body);

    category.save(err => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - falha ao cadastrar categoria`
        });
      } else {
        res.status(201).send(category.toJSON());
      }
    });
  };
}

export default CategoryController;
