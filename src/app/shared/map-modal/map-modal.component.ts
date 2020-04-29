import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { Plugins, Capacitor } from "@capacitor/core";

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("map", { static: true }) mapElementRef: ElementRef;
  clickListener: any;
  googleMaps: any;
  isLoading = false;
  initialLan = 50.4819369;
  initialLng = 30.5266952;
  constructor(
    private modalController: ModalController,
    private renderer: Renderer2,
    private alertController: AlertController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.googleMaps.event.removeListener(this.clickListener);
  }
  ionViewDidEnter() {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.alertController
        .create({
          header: "Could not get location",
          message: "Using default initial position",
          buttons: [{ text: "Ok" }],
        })
        .then((element) => element.present());
    } else {
      try {
        Plugins.Geolocation.getCurrentPosition().then((position) => {
          this.initialLan = position.coords.latitude;
          this.initialLng = position.coords.longitude;
          console.log(position);
        });
      } catch (err) {
        this.alertController
          .create({
            header: "Could not get location",
            message: "Using default initial position",
            buttons: [{ text: "Ok" }],
          })
          .then((element) => element.present());
      }
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        const mapElement = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: { lat: this.initialLan, lng: this.initialLng },
          zoom: 16,
        });
        var marker = new googleMaps.Marker({
          position: { lat: this.initialLan, lng: this.initialLng },
          map: map,
          title: "You are here",
        });
        const renderer = this.renderer;
        googleMaps.event.addListenerOnce(map, "idle", () => {
          renderer.addClass(mapElement, "visible");
          googleMaps.event.trigger(map, "resize");
          map.setZoom(map.getZoom());
        });

        this.clickListener = map.addListener("click", (event) => {
          const coords = event.latLng;
          const selectedCoordinates = {
            lat: coords.lat(),
            lng: coords.lng(),
          };
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
