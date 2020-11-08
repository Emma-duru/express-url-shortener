require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;
const urlController = require("./controllers/urlController");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


app.get("/", urlController.home_page);
app.post("/", urlController.url_post);
app.get("/:crypto", urlController.url_redirect);

app.listen(PORT, () => {
    console.log("Server is running!");
})