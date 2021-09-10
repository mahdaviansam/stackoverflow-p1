const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    postPhoto: {
      type: String,
      required: false,
    },
    // Commented for testing
    // username: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    categories: {
      type: Array,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        unique: true,
      },
    ],
  },
  { timestamps: true }
);
//exporting this schema
module.exports = mongoose.model("Post", PostSchema);
