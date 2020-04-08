import { PlacesService } from "./../../../services/places.service";
import { Component, OnInit } from "@angular/core";
import { Place } from "src/app/models/place";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];
  featuredPlace: Place = {} as Place;
  constructor(private service: PlacesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.places = this.service.places;
    this.featuredPlace = this.places[0];
  }
  openDetails(detailsUrl) {
    window.open(detailsUrl, "_system", "location=yes");
  }
}
