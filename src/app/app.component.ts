import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { AuthService } from "./services/auth.service";
import { Plugins, StatusBarStyle } from "@capacitor/core";
import { BookingService } from "./services/booking.service";
import { take } from "rxjs/operators";

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
          const { SplashScreen, StatusBar } = Plugins;
          if (this.platform.is("hybrid")) {
            SplashScreen.hide();
            StatusBar.setStyle({ style: StatusBarStyle.Light });
          }
        });
    });
  }
  logOut() {
    this.authService.logout();
  }
}
