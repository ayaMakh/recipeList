import { Component, OnInit } from '@angular/core';
import { RecipeBoxService } from './recipebox.service';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-recipebox',
  templateUrl: './recipebox.component.html',
  styleUrls: ['./recipebox.component.css']
})
export class RecipeboxComponent implements OnInit {
  title: string;
  area: string;
  instructions: string;
  imgUrl: string;
  ingredients: string[] = [];
  sourceUrl: string;
  isLoading = false;

  constructor(private recipeBoxService: RecipeBoxService, public recipesService: RecipesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.recipeBoxService.getRecipe().subscribe(recipeData => {
      this.isLoading = false;
      this.title = recipeData.recipe.strMeal;
      this.area = recipeData.recipe.strArea;
      this.instructions = recipeData.recipe.strInstructions;
      this.imgUrl = recipeData.recipe.strMealThumb;
      this.sourceUrl = recipeData.recipe.strSource;
      for (let i = 1; i <= 20; i++) {
        const ingredient = 'strIngredient' + i.toString();
        const measurement = 'strMeasure' + i.toString();
        if (recipeData.recipe[ingredient]) {
          this.ingredients.push(recipeData.recipe[measurement] + ' ' + recipeData.recipe[ingredient]);
        } else {
          break;
        }
      }
    });
  }

  saveRecipe() {
    this.recipesService.addRecipe(
      this.title,
      this.ingredients,
      this.instructions,
      this.imgUrl,
      this.sourceUrl
    );
  }

  refresh() {
    window.location.reload();
  }
}
