import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  isLoading = false;
  isAuthenticated = false;
  userId: string;
  private recipesSub: Subscription;
  private authStatusSubs: Subscription;

  constructor(public recipesService: RecipesService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.recipesService.getRecipes();
    this.userId = this.authService.getUserId();
    this.recipesSub = this.recipesService.getRecipeUpdateListener()
      .subscribe((recipes: Recipe[]) => {
        this.isLoading = false;
        this.recipes = recipes;
      });
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe(result => {
        this.isAuthenticated = result;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(recipeId: string) {
    this.recipesService.deleteRecipe(recipeId);
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
}
