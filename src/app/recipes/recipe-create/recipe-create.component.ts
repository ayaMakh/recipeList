import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredContent = '';
  recipe: Recipe;
  isLoading = false;
  private mode = 'create';
  private recipeId: string;
  private authStatusSub: Subscription;

  constructor(
    public recipesService: RecipesService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recipeId')) {
        this.mode = 'edit';
        this.recipeId = paramMap.get('recipeId');
        this.isLoading = true;
        this.recipesService.getRecipe(this.recipeId).subscribe(recipeData => {
          this.isLoading = false;
          this.recipe = {
            id: recipeData._id,
            title: recipeData.title,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            imgUrl: recipeData.imgUrl,
            sourceUrl: recipeData.sourceUrl,
            creator: recipeData.creator
          };
        });
      } else {
        this.mode = 'create';
        this.recipeId = null;
      }
    });
  }

  onSaveRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const modifiedIngredients: string[] = form.value.ingredients.split(',');
    if (this.mode === 'create') {
      this.recipesService.addRecipe(
        form.value.title,
        modifiedIngredients,
        form.value.instructions,
        form.value.imgUrl,
        form.value.sourceUrl
      );
    } else {
      this.recipesService.updateRecipe(
        this.recipeId,
        form.value.title,
        modifiedIngredients,
        form.value.instructions,
        form.value.imgUrl,
        form.value.sourceUrl
      );
    }
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
