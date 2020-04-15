import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonItemSliding } from "@ionic/angular";
import { Place } from "src/app/models/place";
import { PlacesService } from "src/app/services/places.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit, OnDestroy {
  places: Place[] = [];
  placesSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe((places) => {
      this.places = places;
    });
  }
  ionViewWillEnter() {}
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
          this.places.find((x) => x.id === id).title +
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
              this.placesService.deletePlace(id);
            },
          },
        ],
      })
      .then((element) => {
        element.present();
      });
  }
}
