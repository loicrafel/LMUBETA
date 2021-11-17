const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    public: { type: Boolean },
    description: {
      type: String,
      maxlength: 500,
    },
    picture: {
      type: String,
    },

    likers: {
      type: [String],
    },

    responses: {
      type: [
        {
          text: String,
          vote: Number,
          timestamp: Number,
          posterId: String,
          supporters: [String],
        },
      ],
      required: true,
    },
    after: {
      type: {
        choice: String,
        context: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
