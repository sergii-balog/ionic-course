import { Component, OnInit, Input } from "@angular/core";
import { Place } from "src/app/models/place";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-booking",
  templateUrl: "./add-booking.component.html",
  styleUrls: ["./add-booking.component.scss"],
})
export class AddBookingComponent implements OnInit {
  @Input() place: Place;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss(null, "cancel");
  }

  book() {
    this.modalController.dismiss({}, "confirm");
  }
}
