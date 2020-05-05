import { PlacesService } from "./../../../../services/places.service";
import { AddBookingComponent } from "./../../../bookings/add-booking/add-booking.component";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Place } from "src/app/models/place";
import { BookingService } from "src/app/services/booking.service";

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
    private service: PlacesService,
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("placeId");
    this.service.getPlace(id).subscribe((place) => {
      this.place = place;
    });
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
        if (result.role === "confirm") {
          const data = result.data;
          this.loadingController
            .create({ keyboardClose: true, message: "Placing order ..." })
            .then((element) => {
              element.present();
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  data.firstName,
                  data.lastName,
                  data.numberGuests,
                  new Date(data.dateFrom),
                  new Date(data.dateTo),
                  data.image
                )
                .subscribe(() => {
                  element.dismiss();
                  this.navController.navigateBack("/bookings");
                });
            });
        }
      });
  }
}
