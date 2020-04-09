import { Booking } from "./../models/booking";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private _bookings: Booking[];

  public get bookings() {
    return [...this._bookings];
  }
  constructor() {
    this._bookings = [
      new Booking("b1", "p1", "u1", "Paris, Lui XXI Appartment", 4),
      new Booking("b2", "p2", "u2", "Kyiv, Bohdan Khemlitskiy suite 245", 3),
    ];
  }
  public deleteBooking(id: string) {
    this._bookings = this._bookings.filter((x) => x.id !== id);
  }
}
