import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/recipebox/';

@Injectable({providedIn: 'root'})
export class RecipeBoxService {
  constructor(private http: HttpClient) {}

  getRecipe() {
    return this.http.get<{ message: string; recipe: any }>(
      BACKEND_URL
    );
  }
}
