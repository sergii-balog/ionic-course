import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("map", { static: true }) mapElementRef: ElementRef;
  clickListener: any;
  googleMaps: any;

  constructor(
    private modalController: ModalController,
    private renderer: Renderer2
  ) {}
  ngOnDestroy(): void {
    this.googleMaps.event.removeListener(this.clickListener);
  }
  ionViewDidLoad() {}
  ngAfterViewInit(): void {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        const mapElement = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: { lat: 50.4819369, lng: 30.5266952 },
          zoom: 16,
        });
        const renderer = this.renderer;
        googleMaps.event.addListenerOnce(map, "idle", () => {
          renderer.addClass(mapElement, "visible");
          googleMaps.event.trigger(map, "resize");
          map.setZoom(map.getZoom());
        });

        this.clickListener = map.addListener("click", (event) => {
          const coords = event.latLng;
          const selectedCoordinates = { lat: coords.lat(), lng: coords.lng() };
          this.modalController.dismiss(selectedCoordinates);
        });
      })
      .catch((err) => console.log(err));
  }

  ngOnInit() {}
  onCancel() {
    this.modalController.dismiss();
  }
  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" + environment.gApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Can't load google maps");
        }
      };
    });
  }
}
