import { AuthService } from "./../../../../services/auth.service";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { PlacesService } from "src/app/services/places.service";
import { Place } from "src/app/models/place";
// import { Offer } from "src/app/models/offer";
// import { OffersService } from "src/app/services/offers.service";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage {
  form: FormGroup;
  place: Place;
  constructor(
    private placeService: PlacesService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    route: ActivatedRoute
  ) {
    this.placeService
      .getPlace(route.snapshot.paramMap.get("placeId"))
      .subscribe((place) => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          description: new FormControl(this.place.description, {
            updateOn: "blur",
            validators: [Validators.required, Validators.maxLength(200)],
          }),
          price: new FormControl(this.place.price, {
            updateOn: "blur",
            validators: [Validators.required, Validators.min(1)],
          }),
          dateFrom: new FormControl(this.place.fromDate.toJSON(), {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          dateTo: new FormControl(this.place.toDate.toJSON(), {
            updateOn: "blur",
            validators: [Validators.required],
          }),
        });
      });
  }
  editOffer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.placeService
      .updatePlace(
        new Place(
          this.place.id,
          this.form.value.title,
          this.form.value.description,
          this.place.descriptionUrl,
          this.place.imageUrl,
          this.form.value.price,
          new Date(this.form.value.dateFrom),
          new Date(this.form.value.dateTo),
          this.authService.getUserId()
        )
      )
      .subscribe((places) => {
        this.alertController
          .create({
            header: "Confirmation",
            message:
              "Offer <strong>" +
              this.form.value.title +
              "</strong> updated successfully",
            buttons: [
              {
                text: "Ok",
                handler: () => {
                  this.router.navigateByUrl("/places/tabs/offers");
                },
              },
            ],
          })
          .then((element) => {
            element.present();
          });
      });
  }
}
