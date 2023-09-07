//*Imports
const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/connectDB");
const Tweet = require("./models/Tweet");
const manyTweets = require("./models/manyTweets");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

//*Variables
const app = express();
const PORT = process.env.PORT || 3000;

//*App Congfig
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//*MiddleWares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
// app.use(express.static('public'));

//*Routes
/**
 * Root
 */
app.get("/", (req, res) => {
  res.send("Working");
});

//*============ View Routes

/**
 * Index
 */
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.render("Index", { tweets });
  } catch (error) {
    console.log(error);
  }
});

/**
 * New
 */
app.get("/tweets/new", (req, res) => {
  res.render("New");
});

/**
 * Edit
 */
app.get('/tweets/:id/edit', async (req, res) => {
    const {id} = req.params;
    try {
        const tweet = await Tweet.findById(id);
        res.render('Edit', {tweet});
    } catch (error) {
        
    }
})
/**
 * Show
 */
app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    res.render("Show", { tweet });
  } catch (error) {
    console.log(error);
  }
});

//*=============API Routes
/**
 * Create, POST
 */
app.post("/api/tweets", async (req, res) => {
  await Tweet.create(req.body);
  res.redirect("/tweets");
});

/**
 * Update
 */
app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  if(req.body.sponsored === 'on'){
    req.body.sponsored = true;
  }else{
    req.body.sponsored = false;
  }

  try {
    await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect(`/tweets/${id}`);
  } catch (error) {}
});

/**
 * Delete
 */
app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tweet.findByIdAndDelete(id);
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Add Comments
 */
app.put("/api/tweets/add-comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweetToUpdate = await Tweet.findById(id);
    tweetToUpdate.comments.push(req.body);
    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
      new: true,
    });
    res.redirect(`/tweets/${id}`)
  } catch (error) {
    console.log(error);
  }
});

/**
 * Increase Likes
 */
app.get("/api/tweets/add-like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweetToUpdate = await Tweet.findById(id);
    tweetToUpdate.likes++;
    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
      new: true,
    });
    res.redirect('/tweets');
  } catch (error) {
    console.log(error);
  }
});

/**
 * Seed Route
 */
app.get("/api/tweets/seed", async (req, res) => {
  const createdTweets = await Tweet.insertMany(manyTweets);
  res.send(createdTweets);
});

//* listening and connecting to db
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
