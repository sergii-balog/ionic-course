import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "recipes",
    pathMatch: "full",
    loadChildren: () =>
      import("./recipes/recipes.module").then((m) => m.RecipesPageModule),
  },
  {
    path: "recipes/:recipeId",
    loadChildren: () =>
      import("./recipes/recipes-detail/recipes-detail.module").then(
        (m) => m.RecipesDetailPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
