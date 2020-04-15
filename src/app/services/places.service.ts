import { BehaviorSubject, pipe, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Place } from "./../models/place";
import { Injectable } from "@angular/core";
import { take, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
    new Place(
      "24f34qb",
      "Apartment 1623",
      "Studio, 1 Bathroom.",
      "https://www.apartments.com/the-max-new-york-ny/24f34qb/",
      "https://images1.apartments.com/i2/MrCLzs9xF3FkwXrRei2LfOPQOkRyai1mkdSFZO4t2Yk/116/the-max-new-york-ny-building-photo.jpg",
      3100,
      new Date(2020, 0, 1),
      new Date(2020, 11, 31),
      "123"
    ),
    new Place(
      "04021",
      "Quai Henri IV, Paris 4th",
      "Furnished - 2 Bedrooms.",
      "http://www.pariscorporatehousing.com/en/Corporate-Furnished-Rental-Quai-Henri-IV-Apartment-04021",
      "http://www.pariscorporatehousing.com/content/apartments/04021/images/DSC_9905.jpg",
      5000,
      new Date(2020, 0, 1),
      new Date(2021, 11, 31),
      "123"
    ),
  ]);

  public get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  public getPlace(id: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((x) => x.id === id) };
      })
    );
  }

  public deletePlace(id: string) {
    this.places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.filter((x) => x.id !== id));
    });
  }
  public addPlace(newPlace: Place): Observable<Place[]> {
    return this.places.pipe(
      take(1),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
  public updatePlace(updatedPlace: Place): Observable<Place[]> {
    return this.places.pipe(
      take(1),
      tap((places) => {
        const filtered = places.filter((x) => x.id !== updatedPlace.id);
        this._places.next(filtered.concat(updatedPlace));
      })
    );
  }
  constructor(private authService: AuthService) {}
}
