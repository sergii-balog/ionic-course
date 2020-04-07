import { Recipe } from "./models/recipe";
import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { RecipesService } from "../services/recipes.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscriptionRecipes: Subscription;
  constructor(private service: RecipesService) {}

  ngOnDestroy(): void {
    this.subscriptionRecipes.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionRecipes = this.service
      .getRecipes()
      .subscribe((recipes) => {
        this.recipes = recipes;
        console.log("Subscription changed");
      });
  }
}
