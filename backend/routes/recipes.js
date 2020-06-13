const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const RecipesController = require("../controllers/recipes");


router.post("", checkAuth, RecipesController.createRecipe);

router.put("/:id", checkAuth, RecipesController.updateRecipe);

router.get("", RecipesController.getAllRecipes);

router.get("/:id", RecipesController.getOneRecipe);

router.delete("/:id", checkAuth, RecipesController.deleteRecipe);

module.exports = router;
