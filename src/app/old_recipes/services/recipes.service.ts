import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/models/recipe";
import { Subject, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      title: "Spaghetti puttanesca",
      id: "1",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg",
      ingredients: ["olive oil", "onion", "garlic", "tomatoes", "spaghetti"],
    },
    {
      title: "Tuna pasta bake",
      id: "2",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51616_12.jpg?itok=yakRYH1X",
      ingredients: ["strong cheddar", "milk", "butter", "flour", "tuna"],
    },
    {
      title: "Slow cooker bread",
      id: "3",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/04/slow-cooker-bread.jpg?itok=KzVu0CRx",
      ingredients: ["sea salt", "wholemeal flour", "dried yeast"],
    },
    {
      title: "Spaghetti puttanesca",
      id: "1",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg",
      ingredients: ["olive oil", "onion", "garlic", "tomatoes", "spaghetti"],
    },
    {
      title: "Tuna pasta bake",
      id: "2",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51616_12.jpg?itok=yakRYH1X",
      ingredients: ["strong cheddar", "milk", "butter", "flour", "tuna"],
    },
    {
      title: "Slow cooker bread",
      id: "5",
      imageUrl:
        "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/04/slow-cooker-bread.jpg?itok=KzVu0CRx",
      ingredients: ["sea salt", "wholemeal flour", "dried yeast"],
    },
  ];
  private recipesSubject: BehaviorSubject<Recipe[]>;

  constructor() {
    this.recipesSubject = new BehaviorSubject(this.recipes);
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  public getRecipe(id: string): Recipe {
    return { ...this.recipes.find((x) => x.id === id) };
  }

  public deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter((x) => x.id !== id);
    this.recipesSubject.next(this.recipes);
  }
}
