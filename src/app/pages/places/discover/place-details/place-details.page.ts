import { PlacesService } from "./../../../../services/places.service";
import { AddBookingComponent } from "./../../../bookings/add-booking/add-booking.component";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Place } from "src/app/models/place";

@Component({
  selector: "app-place-details",
  templateUrl: "./place-details.page.html",
  styleUrls: ["./place-details.page.scss"],
})
export class PlaceDetailsPage implements OnInit {
  place: Place;
  constructor(
    private navController: NavController,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private service: PlacesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("placeId");
    this.place = this.service.getPlace(id);
  }
  openDetails(detailsUrl) {
    window.open(detailsUrl, "_system", "location=yes");
  }
  bookPlace() {
    this.modalController
      .create({
        component: AddBookingComponent,
        componentProps: { place: this.place },
      })
      .then((element) => {
        element.present();
        return element.onDidDismiss();
      })
      .then((result) => {
        console.log(result.data, result.role);
      });
    //this.navController.navigateBack("/places/tabs/discover");
  }
}
