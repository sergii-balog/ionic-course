import { RecipesService } from "../../services/recipes.service";
import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../models/recipe";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-recipes-detail",
  templateUrl: "./recipes-detail.page.html",
  styleUrls: ["./recipes-detail.page.scss"],
})
export class RecipesDetailPage implements OnInit {
  recipe: Recipe = {} as Recipe;

  constructor(
    private route: ActivatedRoute,
    private service: RecipesService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("recipeId");
    this.recipe = this.service.getRecipe(id);
  }
  async onDeleteRecipe() {
    const alert = await this.alertController.create({
      header: "Confirmation",
      message:
        "Are you sure you want to delete <strong>" +
        this.recipe.title +
        "</strong> recipe?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Delete",
          handler: async () => {
            this.service.deleteRecipe(this.recipe.id);

            const alert1 = await this.alertController.create({
              header: this.recipe.title,
              subHeader: "Deleted",
              message:
                "<strong>" + this.recipe.title + "</strong> has been deleted",
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.router.navigate(["/recipes"]);
                  },
                },
              ],
            });

            await alert1.present();
          },
        },
      ],
    });
    await alert.present();
  }
}
