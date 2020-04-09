import { Place } from "./../models/place";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "24f34qb",
      "Apartment 1623",
      "Studio, 1 Bathroom.",
      "https://www.apartments.com/the-max-new-york-ny/24f34qb/",
      "https://images1.apartments.com/i2/MrCLzs9xF3FkwXrRei2LfOPQOkRyai1mkdSFZO4t2Yk/116/the-max-new-york-ny-building-photo.jpg",
      3100
    ),
    new Place(
      "04021",
      "Quai Henri IV, Paris 4th",
      "Furnished - 2 Bedrooms.",
      "http://www.pariscorporatehousing.com/en/Corporate-Furnished-Rental-Quai-Henri-IV-Apartment-04021",
      "http://www.pariscorporatehousing.com/content/apartments/04021/images/DSC_9905.jpg",
      5000
    ),
  ];

  public get places() {
    return [...this._places];
  }
  public getPlace(id: string): Place {
    return { ...this._places.find((x) => x.id === id) };
  }
  constructor() {}
}
