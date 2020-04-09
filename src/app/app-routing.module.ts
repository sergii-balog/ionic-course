import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "places", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "places",
    loadChildren: () =>
      import("./pages/places/places.module").then((m) => m.PlacesPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "bookings",
    loadChildren: () =>
      import("./pages/bookings/bookings.module").then(
        (m) => m.BookingsPageModule
      ),
    canLoad: [AuthGuard],
  },
  // {
  //   path: "home",
  //   loadChildren: () =>
  //     import("./old_recipes/home/home.module").then((m) => m.HomePageModule),
  // },
  // {
  //   path: "recipes",
  //   pathMatch: "full",
  //   loadChildren: () =>
  //     import("./old_recipes/recipes/recipes.module").then((m) => m.RecipesPageModule),
  // },
  // {
  //   path: "recipes/:recipeId",
  //   loadChildren: () =>
  //     import("./old_recipes/recipes/recipes-detail/recipes-detail.module").then(
  //       (m) => m.RecipesDetailPageModule
  //     ),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
