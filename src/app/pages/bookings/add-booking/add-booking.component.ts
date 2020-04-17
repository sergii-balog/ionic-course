import { Component, OnInit, Input } from "@angular/core";
import { Place } from "src/app/models/place";
import { ModalController, AlertController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-add-booking",
  templateUrl: "./add-booking.component.html",
  styleUrls: ["./add-booking.component.scss"],
})
export class AddBookingComponent implements OnInit {
  @Input() place: Place;
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      numberGuests: new FormControl("2", {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  cancel() {
    this.modalController.dismiss(null, "cancel");
  }

  book() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.modalController.dismiss(this.form.value, "confirm");
    // this.alertController
    //   .create({
    //     header: "Booking confirmation",
    //     message:
    //       "<strong>" +
    //       this.form.value.firstName +
    //       "</strong>, your booking for " +
    //       this.form.value.numberGuests +
    //       " guests has been confirmed!",
    //     buttons: [
    //       {
    //         text: "Ok",
    //         handler: () => {
    //           this.modalController.dismiss(this.form.value, "confirm");
    //         },
    //       },
    //     ],
    //   })
    //   .then((element) => {
    //     element.present();
    //   });
  }
}
