const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URL;

const opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const atlasconnection = async () => {
  try {
    const mongo_connection = await mongoose.connect(url, opt);

    console.log("Mongo DB is connected");
  } catch (error) {
    console.log("Mongo DB Connection Error", error);
  }
};

const load_data = async () => {
  const articleSchema = {
    title: String,
    content: String,
  };

  const Article = mongoose.model("Article", articleSchema);

  //   upload new document

  const new_article = new Article({
    title: "MEST",
    content: "I am a content creator",
  });

  const some_return = await new_article.save();

  return some_return;
};

const new_article = async (title, content) => {
  // Creating Schema (Schema)
  const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
  });

  //   Creating Model (Model)

  let Article;

  if (!mongoose.models.hasOwnProperty("Article")) {
    Article = mongoose.model("Article", articleSchema);
  } else {
    Article = mongoose.model("Article");
  }

  // Importing data (New Instance)

  const new_article = new Article({
    title: title,
    content: content,
  });

  try {
    return await new_article.save();
  } catch (error) {
    console.log(error);
  }
};

const articles = async (title) => {
  const articleSchema = {
    title: String,
    content: String,
  };

  let Article;
  if (!mongoose.models.hasOwnProperty("Article")) {
    Article = mongoose.model("Article", articleSchema);
  } else {
    Article = mongoose.model("Article");
  }

  if (title) {
    try {
      return await Article.find({ title: title });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      return await Article.find({});
    } catch (error) {
      console.log(error);
    }
  }
};

const delete_articles = async () => {
  const articleSchema = {
    title: String,
    content: String,
  };

  let Article;
  if (!mongoose.models.hasOwnProperty("Article")) {
    Article = mongoose.model("Article", articleSchema);
  } else {
    Article = mongoose.model("Article");
  }

  try {
    await Article.deleteMany();
    console.log("Artiles successfuly deleted");
  } catch (error) {
    console.log(error);
  }
};

const update_articles = async (title, content) => {
  // Schema
  const articleSchema = {
    title: String,
    content: String,
  };

  let Article;
  if (!mongoose.models.hasOwnProperty("Article")) {
    // Model and Instance
    Article = mongoose.model("Article", articleSchema);
  } else {
    Article = mongoose.model("Article");
  }

  try {
    const { modifiedCount } = await Article.updateOne(
      { title: title },
      { content: content }
    );

    return modifiedCount;
  } catch (error) {
    console.log(error);
  }
};

module.exports.Atlas_CON = atlasconnection;
module.exports.Articles_Fetcher = articles;
module.exports.Add_New_Article = new_article;
module.exports.Delete_Articles = delete_articles;
module.exports.Update_Articles = update_articles;
