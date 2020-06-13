const Recipe = require("../models/recipe");

exports.createRecipe = (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imgUrl: req.body.imgUrl,
    sourceUrl: req.body.sourceUrl,
    creator: req.userData.userId
  });
  recipe.save().then(createdRecipe => {
    res.status(201).json({
      message: "Recipe added successfully.",
      recipeId: createdRecipe._id
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Creating a recipe failed due to a server error."
    })
  });
}

exports.updateRecipe = (req, res, next) => {
  const recipe = new Recipe({
    _id: req.body.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imgUrl: req.body.imgUrl,
    sourceUrl: req.body.sourceUrl,
    creator: req.userData.userId
  });
  Recipe.updateOne({ _id: req.params.id, creator: req.userData.userId }, recipe).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful." });
    } else {
      res.status(401).json({ message: "Not authorized." });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Update failed due to a server error."
    })
  });
}

exports.getAllRecipes = (req, res, next) => {
  Recipe.find().then(documents => {
    res.status(200).json({
      message: "Recipes fetched successfully",
      recipes: documents
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Fetching recipes failed due to a server error."
    })
  });
}

exports.getOneRecipe = (req, res, next) => {
  Recipe.findById(req.params.id).then(recipe => {
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Fetching recipe failed due to a server error."
    })
  });
}

exports.deleteRecipe = (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful" });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Deletion failed due to a server error."
    })
  });
}
