const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dpnyafdc5",
  api_key: "476375462659828",
  api_secret: "te0X7bHNDmtcUnn2syh1ulBTgxM",
});

module.exports = { cloudinary };
