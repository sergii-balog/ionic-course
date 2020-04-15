import { PlacesService } from "./../../../services/places.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Place } from "src/app/models/place";
import { Subscription } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  places: Place[] = [];
  featuredPlace: Place = {} as Place;
  filter = "all";
  placesSubscription: Subscription;

  constructor(private service: PlacesService) {}

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.placesSubscription = this.service.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.places = places;
      this.featuredPlace = this.places[0];
    });
  }

  ionViewWillEnter() {}

  openDetails(detailsUrl) {
    window.open(detailsUrl, "_system", "location=yes");
  }

  segmentChanged(ev: CustomEvent) {
    if (this.filter === "all") {
      this.places = this.loadedPlaces;
    } else {
      this.places = this.places.filter((x) => x.id !== "24f34qb");
      console.log(this.places);
    }
    this.featuredPlace = this.places[0];
  }
}
