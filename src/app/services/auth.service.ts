import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated = true;
  private _userId = "123";

  constructor(private router: Router) {}

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public getUserId(): string {
    return this._userId;
  }

  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = false;
    this.router.navigateByUrl("/auth");
  }
}
