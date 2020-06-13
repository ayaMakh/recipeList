const fetch = require('node-fetch');

exports.getRandomRecipe = (req, res, next) => {
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    res.status(200).json({
      message: "Recipe fetched successfully",
      recipe: data.meals[0]
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Fetching recipe failed.",
      error: err
    })
  });
}

