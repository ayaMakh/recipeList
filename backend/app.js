const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const recipesRoutes = require("./routes/recipes");
const userRoutes = require("./routes/user");
const recipeBoxRoutes = require("./routes/recipebox");

const app = express();

var url = "mongodb+srv://aya:" + process.env.MONGO_ATLAS_PW + "@recipelistapp-hli7z.mongodb.net/recipelistapp?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/recipes", recipesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipebox", recipeBoxRoutes);

module.exports = app;
