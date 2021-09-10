const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    commentdescription: {
      type: String,
      required: true,
    },
    // Commented for testing
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
