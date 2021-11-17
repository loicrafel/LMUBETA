const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({ type: "user" }).select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = (req, res, next) => {
  UserModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.choose = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        after: {
          choice: req.body.choice,
          context: req.body.context,
        },
      },

      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(402).send(err);
      }
    );
  } catch (err) {
    return res.status(403).send(err);
  }
};
