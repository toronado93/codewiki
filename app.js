const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Update_Articles } = require("./db");
const app = express();

const {
  Atlas_CON,
  Articles_Fetcher,
  Add_New_Article,
  Delete_Articles,
} = require(__dirname + "/db.js");

// MiddleWare
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

Atlas_CON();

app.use(express.static("public"));

app.get("/articles", async (req, res) => {
  const responde = await Articles_Fetcher();

  res.send(responde);
});

app.post("/articles", async (req, res) => {
  const responde = await Add_New_Article(req.body.title, req.body.content);
  res.send(responde);
});

app
  .route("/articles/:title")
  .get(async (req, res) => {
    const title = req.params.title;

    try {
      const responde = await Articles_Fetcher(title);
      console.log("Requested Article is found");
      res.send(responde);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    const title = req.params.title;
    // const body_title = req.body.title;
    const content = req.body.content;

    try {
      const responde = await Update_Articles(title, content);
      console.log(responde);
      responde === 1
        ? res.send("Article is updated")
        : res.send("Updated process is unsuccesfull");
    } catch (error) {
      console.log(error);
    }
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
