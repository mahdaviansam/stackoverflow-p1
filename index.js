const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB);

// connectDB();

const Post = require("./Model/Post");
const Comment = require("./Model/Comment");

// add post
app.post("/posts/add", async (req, res) => {
  console.log(req.body);
  const post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    data: post,
  });
});

// add comment
app.post("/comment/add", async (req, res) => {
  const comment = await Comment.create(req.body);
  const post = await Post.findByIdAndUpdate(
    { _id: comment.postId },
    {
      $addToSet: { comments: comment._id },
    }
  );
  res.status(200).json({
    success: true,
    data: comment,
  });
});

// get all post
app.get("/posts", async (req, res) => {
  const post = await Post.find({});
  res.status(200).json({
    post,
  });
});

// delete comment
app.delete("/comment/:id", async (req, res) => {
  const com = await Comment.findById(req.params.id);

  console.log("postid", com.postId);

  await Post.findByIdAndUpdate(
    { _id: com.postId },
    {
      $pull: { comments: com._id },
    },

    { new: true }
  );

  await com.delete();

  res.status(200).json({
    success: true,
  });
});

app.listen(port, () => {
  console.log("server connect");
});
