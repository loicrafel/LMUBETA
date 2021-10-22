const PostModel = require("../models/post.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../validation/upload.js");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = Date.now() + ".jpg";
  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../client/public/profil/${fileName}`)
  );

  try {
    await PostModel.findByIdAndUpdate(
      req.body.postId,
      { $set: { picture: "./profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then(() => res.status(200).json({ message: "image uploadée !" }));
  } catch (err) {
    return res.status(500).send(err);
  }
};
