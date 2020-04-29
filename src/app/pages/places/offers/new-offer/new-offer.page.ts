import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "src/app/services/places.service";
import { Place } from "src/app/models/place";
import { ServiceHelper } from "src/app/services/serviceHelper";
import { PlaceLocation } from "src/app/models/google-maps";
// import { OffersService } from "src/app/services/offers.service";
// import { Offer } from "src/app/models/offer";

@Component({
  selector: "app-new-offer",
  templateUrl: "./new-offer.page.html",
  styleUrls: ["./new-offer.page.scss"],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      price: new FormControl(null, {
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
      location: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit() {}
  onLocationPicked(place: PlaceLocation) {
    this.form.patchValue({ location: place });
  }
  addNewOffer() {
    console.log(this.form.value);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    // console.log("adding...", this.form.value);
    // const d1 = new Date(this.form.get("dateFrom").value);
    // console.log(d1.getFullYear(), d1.getMonth() + 1, d1.getDate());
    this.placesService
      .addPlace(
        new Place(
          ServiceHelper.getNewGuid(),
          this.form.value.title,
          this.form.value.description,
          "http://www.google.com",
          "https://i.ytimg.com/vi/rdaZ5HEvZmg/maxresdefault.jpg",
          this.form.value.price,
          new Date(this.form.value.dateFrom),
          new Date(this.form.value.dateTo),
          "123"
        )
      )
      .subscribe((places) => {
        this.alertController
          .create({
            header: "Confirmation",
            message:
              "Offer <strong>" +
              this.form.value.title +
              "</strong> added successfully",
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
