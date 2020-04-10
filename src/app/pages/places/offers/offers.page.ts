import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { OffersService } from "./../../../services/offers.service";
import { Offer } from "./../../../models/offer";
import { Component, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit {
  offers: Offer[] = [];

  constructor(
    private offersService: OffersService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.offers = this.offersService.offers;
  }
  editOffer(id: string, slider: IonItemSliding) {
    slider.closeOpened();
    this.router.navigateByUrl("/places/tabs/offers/edit/" + id);
  }
  cancelOffer(id: string, slider: IonItemSliding) {
    this.alertController
      .create({
        header: "Confirmation",
        message:
          "Are you sure you want to delete offer <strong>" +
          this.offers.find((x) => x.id === id).title +
          "</strong>?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => slider.closeOpened(),
          },
          {
            text: "Delete",
            handler: () => {
              this.offersService.deleteOffer(id);
              this.offers = this.offersService.offers;
            },
          },
        ],
      })
      .then((element) => {
        element.present();
      });
  }
}
