import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeboxComponent } from './recipebox/recipebox.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'create', component: RecipeCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:recipeId', component: RecipeCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'randomrecipe', component: RecipeboxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
