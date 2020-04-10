import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

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

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loadingController
      .create({ keyboardClose: true, message: "Logging in ..." })
      .then((element) => {
        element.present();
        setTimeout(() => {
          this.authService.login();
          this.loadingController.dismiss();
          this.router.navigateByUrl("/places");
          this.cleanForm(form);
        }, 3000);
      });
  }
  private cleanForm(form: NgForm) {
    form.controls.email.markAsUntouched();
    form.controls.email.setValue("");
    form.controls.password.markAsUntouched();
    form.controls.password.setValue("");
  }
}
