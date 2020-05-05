import { AddBookingComponent } from "./../../../bookings/add-booking/add-booking.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PlaceDetailsPageRoutingModule } from "./place-details-routing.module";

import { PlaceDetailsPage } from "./place-details.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [PlaceDetailsPage, AddBookingComponent],
  entryComponents: [AddBookingComponent],
})
export class PlaceDetailsPageModule {}
