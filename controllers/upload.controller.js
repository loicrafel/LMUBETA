const PostModel = require("../models/post.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  const ext = req.file.clientReportedFileExtension;
  console.log("ext=", ext);
  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg")
    return res.status(400).json({
      format: "Seuls les formats jpg, png et et jpeg sont acceptés",
    });

  if (req.file.size > 500000)
    return { maxSize: "La taille maximale est atteinte" };

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
