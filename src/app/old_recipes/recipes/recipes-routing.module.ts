import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesPage } from "./recipes.page";
import { RecipesDetailPage } from "./recipes-detail/recipes-detail.page";

const routes: Routes = [
  {
    path: "",
    component: RecipesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
