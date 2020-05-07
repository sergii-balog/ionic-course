import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { AuthService } from "./services/auth.service";
import { Plugins, Capacitor } from "@capacitor/core";
import { BookingService } from "./services/booking.service";
import { take } from "rxjs/operators";
const { App } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private bookingService: BookingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.bookingService.bookings
        .pipe(take(1))
        .toPromise()
        .then(() => {
          const { SplashScreen } = Plugins;
          if (Capacitor.isPluginAvailable("SplashScreen")) {
            SplashScreen.hide();
          }
        });
      // this.authService
      //   .getUserInfo()
      //   .toPromise()
      //   .then((user) => {
      //     console.log("User initited");
      //   });
      // App.addListener("appStateChange", (state) => {
      //   if (state.isActive) {
      //   }
      // });
    });
  }
  logOut() {
    this.authService.logout();
  }
}
