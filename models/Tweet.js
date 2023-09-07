//Imports
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: String, required: true },
}, {timestamps: true});

//Schema creation
const tweetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    author: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    sponsored: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

//Create Model
const Tweet = mongoose.model("Tweet", tweetSchema);

//Export
module.exports = Tweet;
