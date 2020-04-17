import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AlertController,
  IonItemSliding,
  LoadingController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { Booking } from "src/app/models/booking";
import { BookingService } from "./../../services/booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  subscpirtion: Subscription;
  isLoading = true;
  constructor(
    private bookingService: BookingService,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) {}
  ngOnDestroy(): void {
    this.subscpirtion.unsubscribe();
  }

  ngOnInit() {
    this.subscpirtion = this.bookingService.bookings.subscribe((bookings) => {
      this.bookings = bookings;
      this.isLoading = false;
    });
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
              this.loadingController
                .create({ keyboardClose: true, message: "Deleting ..." })
                .then((element) => {
                  element.present();
                  this.bookingService.deleteBooking(id).subscribe(() => {
                    element.dismiss();
                  });
                });
            },
          },
        ],
      })
      .then((element) => {
        element.present();
      });
  }
}
