const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.getPost = (req, res) => {
  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
};

module.exports.getPostsfromUser = async (req, res) => {
  const postFromUser = await PostModel.find({
    posterId: req.params.id,
  }).select();
  res.status(200).json(postFromUser);
};

module.exports.randomPost = async (req, res) => {
  try {
    const randomPlayer = await PostModel.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(randomPlayer);
  } catch (err) {
    return res.status(202).json({ err });
  }
};

module.exports.createPost = async (req, res) => {
  const ext = req.file.clientReportedFileExtension;
  console.log("ext=", ext);
  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg")
    return res.status(400).json({
      format: "Seuls les formats jpg, png et et jpeg sont acceptés",
    });

  if (req.file.size > 500000)
    return { maxSize: "La taille maximale est atteinte" };

  let fileName = Date.now() + ".jpg";
  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../client/public/profil/${fileName}`)
  );

  const newPost = new PostModel({
    posterId: req.body.posterId,
    description: req.body.description,
    public: false,
    picture: req.file !== null ? "./profil/" + fileName : "",
    likers: [],
  });
  try {
    const Post = await newPost.save();
    return res.status(201).json(Post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.vote = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const Resp = docs.responses.find((response) =>
        response._id.equals(req.body.respId)
      );

      if (!Resp) return res.status(404).send("Comment not found");
      Resp.vote = Resp.vote + 1;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        console.log("votre vote a bien été enregistré!");
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(402).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unlikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(402).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.publish = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      docs.public = !docs.public;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        console.log("votre publication a bien été enregistrée");
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.AddResponse = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          responses: {
            text: req.body.text,
            vote: 1,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(402).send(err);
      }
    );
  } catch (err) {
    return res.status(403).send(err);
  }
};
