import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Recipe } from './recipe.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/recipes/';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipes: Recipe[] = [];
  private recipesUpdated = new Subject<Recipe[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getRecipes() {
    this.http
      .get<{ message: string; recipes: any }>(BACKEND_URL)
      .pipe(
        map(recipeData => {
          return recipeData.recipes.map(recipe => {
            return {
              title: recipe.title,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              imgUrl: recipe.imgUrl,
              sourceUrl: recipe.sourceUrl,
              id: recipe._id,
              creator: recipe.creator
            };
          });
        })
      )
      .subscribe(transformedRecipes => {
        this.recipes = transformedRecipes;
        this.recipesUpdated.next([...this.recipes]);
      });
  }

  getRecipeUpdateListener() {
    return this.recipesUpdated.asObservable();
  }

  getRecipe(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      ingredients: string[];
      instructions: string;
      imgUrl: string;
      sourceUrl: string;
      creator: string
    }>(
      BACKEND_URL + id
    );
  }

  addRecipe(title: string, ingredients: string[], instructions: string, imgUrl: string, sourceUrl: string) {
    const recipe: Recipe = {
      id: null,
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      imgUrl: imgUrl,
      sourceUrl: sourceUrl,
      creator: null
    };
    this.http
      .post<{ message: string; recipeId: string }>(
        BACKEND_URL,
        recipe
      )
      .subscribe(responseData => {
        const id = responseData.recipeId;
        recipe.id = id;
        this.recipes.push(recipe);
        this.recipesUpdated.next([...this.recipes]);
        this.router.navigate(['/']);
      });
  }

  updateRecipe(id: string, title: string, ingredients: string[], instructions: string, imgUrl: string, sourceUrl: string) {
    const recipe: Recipe = {
      id: id,
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      imgUrl: imgUrl,
      sourceUrl: sourceUrl,
      creator: null
    };
    this.http
      .put(BACKEND_URL + id, recipe)
      .subscribe(response => {
        const updatedRecipes = [...this.recipes];
        const oldRecipeIndex = updatedRecipes.findIndex(p => p.id === recipe.id);
        updatedRecipes[oldRecipeIndex] = recipe;
        this.recipes = updatedRecipes;
        this.recipesUpdated.next([...this.recipes]);
        this.router.navigate(['/']);
      });
  }

  deleteRecipe(recipeId: string) {
    this.http
      .delete(BACKEND_URL + recipeId)
      .subscribe(() => {
        const updatedRecipes = this.recipes.filter(recipe => recipe.id !== recipeId);
        this.recipes = updatedRecipes;
        this.recipesUpdated.next([...this.recipes]);
      });
  }
}
