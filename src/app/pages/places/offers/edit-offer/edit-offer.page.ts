import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OffersService } from "src/app/services/offers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Offer } from "src/app/models/offer";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage {
  form: FormGroup;
  offer: Offer;
  constructor(
    private offersService: OffersService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.offer = this.offersService.getOffer(
      route.snapshot.paramMap.get("placeId")
    );
    this.form = new FormGroup({
      title: new FormControl(this.offer.title, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      description: new FormControl(this.offer.description, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      price: new FormControl(this.offer.price, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(this.offer.dateFrom.toJSON(), {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      dateTo: new FormControl(this.offer.dateTo.toJSON(), {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }
  editOffer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.offersService.updateOffer(
      new Offer(
        this.offer.id,
        this.form.value.title,
        this.form.value.description,
        this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo)
      )
    );
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
  }
}
