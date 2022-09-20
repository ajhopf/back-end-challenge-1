import categories from '../models/Category.js';
import videos from '../models/Video.js';

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

  static viewCategoryById = (req, res) => {
    const id = req.params.id;

    categories.findById(id).exec((err, category) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).json(category);
      }
    });
  };

  static viewCategoryVideos = (req, res) => {
    const id = req.params.id;

    videos
      .find({ category: id })
      .populate('category')
      .exec((err, videos) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(200).json(videos);
        }
      });
  };

  static saveCategory = async (req, res) => {
    let category = new categories(req.body);

    //Incrementenando o id da categoria baseado no numero de documentos existentes na collection
    if (!category._id) {
      category._id = await categories.countDocuments({});
      category._id++;
    }

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

  static updateCategory = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
      (err, category) => {
        if (err) {
          res.status(500).send({
            message: err.messge
          });
        } else {
          res.status(200).send({
            message: 'Categoria atualizada com sucesso',
            category: category
          });
        }
      }
    );
  };

  static deleteCategory = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndDelete(id, err => {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.status(200).send({
          message: 'Categoria removida com sucesso'
        });
      }
    });
  };
}

export default CategoryController;
