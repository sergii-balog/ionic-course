import { BookingService } from "./../../services/booking.service";
import { Component, OnInit } from "@angular/core";
import { Booking } from "src/app/models/booking";
import { IonItemSliding, AlertController } from "@ionic/angular";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];

  constructor(
    private bookingService: BookingService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.bookings = this.bookingService.bookings;
  }
  cancelBooking(id: string, slider: IonItemSliding) {
    this.alertController
      .create({
        header: "Confirmation",
        message:
          "Are you sure you want to delete booking for <strong>" +
          this.bookings.find((x) => x.id === id).placeTitle +
          "</strong> appartment?",
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
              this.bookingService.deleteBooking(id);
              this.bookings = this.bookingService.bookings;
            },
          },
        ],
      })
      .then((element) => {
        element.present();
      });
  }
}
