import videos from '../models/Video.js';

class VideoController {
  static viewVideos = (req, res) => {
    videos
      .find()
      .populate('category')
      .exec((err, videos) => {
        if (err) {
          res.status(500).send({ message: 'erro no servidor' });
        } else {
          res.status(200).json(videos);
        }
      });
  };

  static viewVideoById = (req, res) => {
    const id = req.params.id;

    videos
      .findById(id)
      .populate('category')
      .exec((err, videos) => {
        if (err) {
          res.status(400).send({
            message: `${err.message} - Id do vídeo não localizado`
          });
        } else {
          res.status(200).send(videos);
        }
      });
  };

  static saveVideo = (req, res) => {
    let video = new videos(req.body);

    if (!video.category) {
      video.category = 1;
    }

    video.save(err => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - falha ao salvar o vídeo`
        });
      } else if (validateNewVideo(req.body) === true) {
        res.status(201).send(video.toJSON());
      } else {
        res.status(400).send({
          message: validateNewVideo(req.body)
        });
      }
    });
  };

  static updateVideo = (req, res) => {
    const id = req.params.id;

    videos.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
      (err, videos) => {
        console.log(videos);
        if (err) {
          res.status(500).send({
            message: err.messge
          });
        } else {
          res.status(200).send({
            message: 'Video atualizado com sucesso',
            video: videos
          });
        }
      }
    );
  };

  static deleteVideo = (req, res) => {
    const id = req.params.id;

    videos.findByIdAndDelete(id, err => {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.status(200).send({
          message: 'Video removido com sucesso'
        });
      }
    });
  };

  static viewVideoByTitle = (req, res) => {
    const title = req.query.title;

    videos
      .find({ title: title })
      .populate('category')
      .exec((err, video) => {
        if (err) {
          res.status(404).send({
            message: err.message
          });
        }
        res.status(200).send(video);
      });
  };
}

function validateNewVideo(body) {
  let bodyLength = body.title.length <= 50;
  let descriptionLength = body.description.length <= 50;

  let url;

  try {
    url = new URL(body.url);
  } catch {
    url = false;
  }

  if (!bodyLength) {
    return 'O título deve conter no máximo 50 caracteres.';
  } else if (!descriptionLength) {
    return 'A descrição deve conter no máximo 50 caracteres';
  } else if (!url) {
    return 'A url deve ser válida';
  } else {
    return true;
  }
}

export default VideoController;
