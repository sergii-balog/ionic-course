import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
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
    private loadingController: LoadingController,
    private alertController: AlertController
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
        this.authService
          .login(form.controls.email.value, form.controls.password.value)
          .subscribe(
            (userData) => {
              this.loadingController.dismiss();
              this.router.navigateByUrl("/places");
              this.cleanForm(form);
            },
            (error) => {
              console.log(error);
              this.loadingController.dismiss();
              this.alertController
                .create({
                  message: "Invalid login/password",
                  header: "Login error",
                  buttons: ["Ok"],
                })
                .then((element) => {
                  element.present();
                });
            }
          );
      });
  }
  private cleanForm(form: NgForm) {
    form.controls.email.markAsUntouched();
    form.controls.email.setValue("");
    form.controls.password.markAsUntouched();
    form.controls.password.setValue("");
  }
}
