import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { delay, take, tap, switchMap, map } from "rxjs/operators";
import { Booking } from "./../models/booking";
import { AuthService } from "./auth.service";
import { ServiceHelper } from "./serviceHelper";
import { BookingDTO } from "../models/booking-dto";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private _bookings: BehaviorSubject<Booking[]>;

  public get bookings(): Observable<Booking[]> {
    if (this._bookings) {
      return this._bookings.asObservable();
    } else {
      this._bookings = new BehaviorSubject<Booking[]>([]);
      return this.fetchBookings();
    }
  }
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  private fetchBookings(): Observable<Booking[]> {
    return this.httpClient
      .get<{ [key: string]: BookingDTO }>(
        `https://ionic-course-9b889.firebaseio.com/bookings.json`
      )
      .pipe(
        map((result) => {
          const bookings: Booking[] = [];
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const dto = result[key];
              bookings.push(
                new Booking(
                  key,
                  dto.placeId,
                  dto.userId,
                  dto.placeTitle,
                  dto.firstName,
                  dto.lastName,
                  dto.guestNumber,
                  new Date(dto.dateFrom),
                  new Date(dto.dateTo)
                )
              );
            }
          }
          return bookings;
        }),
        tap((bookings) => {
          this._bookings.next(bookings);
        })
      );
  }
  public deleteBooking(id: string): Observable<Booking[]> {
    return this.httpClient
      .delete(`https://ionic-course-9b889.firebaseio.com/bookings/${id}.json`)
      .pipe(
        switchMap((result) => {
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          this._bookings.next(bookings.filter((x) => x.id !== id));
        })
      );
  }
  public addBooking(
    placeId: string,
    placeTitle: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ): Observable<any> {
    const newBooking = new Booking(
      ServiceHelper.getNewGuid(),
      placeId,
      this.authService.getUserId(),
      placeTitle,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    let newId = "";
    return this.httpClient
      .post<{ name: string }>(
        "https://ionic-course-9b889.firebaseio.com/bookings.json",
        {
          ...newBooking,
          id: null,
        }
      )
      .pipe(
        switchMap((result) => {
          newId = result.name;
          return this.bookings;
        }),
        take(1),
        tap((booking) => {
          newBooking.id = newId;
          this._bookings.next(booking.concat(newBooking));
        })
      );
  }
}
