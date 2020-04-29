import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, switchMap } from "rxjs/operators";
import { PlaceLocation } from "src/app/models/google-maps";
import { of } from "rxjs";

@Component({
  selector: "location-picker",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit {
  selectedImageUrl: string;
  isLoading = false;
  @Output() locationPicked = new EventEmitter<PlaceLocation>();
  constructor(
    private modalController: ModalController,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}
  onPickLocation() {
    this.modalController
      .create({ component: MapModalComponent })
      .then((element) => {
        element.onDidDismiss().then((modalData) => {
          if (modalData.data) {
            this.isLoading = true;
            const pickedLocation: PlaceLocation = {
              lat: modalData.data.lat,
              lng: modalData.data.lng,
              address: null,
              staticMapImageUrl: null,
            };
            this.getAddress(pickedLocation.lat, pickedLocation.lng)
              .pipe(
                switchMap((address) => {
                  pickedLocation.address = address;
                  return of(
                    this.getMapImage(pickedLocation.lat, pickedLocation.lng, 16)
                  );
                })
              )
              .subscribe((imageUrl) => {
                pickedLocation.staticMapImageUrl = imageUrl;
                this.selectedImageUrl = imageUrl;
                this.isLoading = false;
                this.locationPicked.emit(pickedLocation);
              });
          }
        });
        element.present();
      });
  }
  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}&key=${environment.gApiKey}`;
  }
  private getAddress(lat: number, lng: number) {
    return this.httpClient
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.gApiKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
}
