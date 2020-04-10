import { Offer } from "./../models/offer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OffersService {
  private _offers: Offer[];

  public get offers() {
    return [...this._offers];
  }
  constructor() {
    this._offers = [
      new Offer(
        "o1",
        "Great 2 bedroom appartment on Zakrevsky",
        "Best place on troeshka",
        1500,
        new Date(2020, 0, 1),
        new Date(2020, 11, 1)
      ),
      new Offer(
        "o2",
        "Great 1 bedroom studio on Krashchatyik",
        "Heart of Kyiv and heard of Earth!",
        4500,
        new Date(2020, 3, 1),
        new Date(2020, 10, 1)
      ),
    ];
  }
  public deleteOffer(id: string) {
    this._offers = this._offers.filter((x) => x.id !== id);
  }
  public getOffer(id: string) {
    return { ...this._offers.find((x) => x.id === id) };
  }
  public addOffer(offer: Offer) {
    this._offers.push(offer);
  }
  public updateOffer(offer: Offer) {
    this._offers = this._offers.filter((x) => x.id !== offer.id);
    this._offers.push(offer);
  }
}
