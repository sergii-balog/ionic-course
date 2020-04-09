import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  login() {
    this.loadingController
      .create({ keyboardClose: true, message: "Logging in ..." })
      .then((element) => {
        element.present();
        setTimeout(() => {
          this.authService.login();
          this.loadingController.dismiss();
          this.router.navigateByUrl("/places");
        }, 3000);
      });
  }
}
