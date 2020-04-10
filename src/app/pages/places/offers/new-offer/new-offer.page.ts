import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OffersService } from "src/app/services/offers.service";
import { Offer } from "src/app/models/offer";

@Component({
  selector: "app-new-offer",
  templateUrl: "./new-offer.page.html",
  styleUrls: ["./new-offer.page.scss"],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private offersService: OffersService,
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
    });
  }

  ngOnInit() {}

  addNewOffer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    // console.log("adding...", this.form.value);
    // const d1 = new Date(this.form.get("dateFrom").value);
    // console.log(d1.getFullYear(), d1.getMonth() + 1, d1.getDate());
    this.offersService.addOffer(
      new Offer(
        this.uuidv4(),
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
  }
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
