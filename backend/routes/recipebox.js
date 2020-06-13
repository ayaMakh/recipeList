const express = require("express");
const router = express.Router();
const RecipeBoxController = require("../controllers/recipebox");

router.get("", RecipeBoxController.getRandomRecipe);

module.exports = router;
