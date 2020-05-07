import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { tap, switchMap, map } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
import { of, Observable, from, BehaviorSubject } from "rxjs";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _userId = null;
  private TokenKeyName = "token";

  constructor(private router: Router, private httpClient: HttpClient) {}

  public get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  public getUserId(): string {
    return this._userId;
  }

  getUserInfo() {
    return from(Storage.get({ key: this.TokenKeyName })).pipe(
      switchMap((result) => {
        if (!result || !result.value) {
          return of(false);
        }
        return this.httpClient.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebaseAuthKey}`,
          { idToken: result.value }
        );
      }),
      tap((response: any) => {
        if (response && response.users) {
          this._isAuthenticated.next(true);
          this._userId = response.users[0].localId;
        }
      }),
      map(() => {
        return !!this._userId;
      })
    );
  }
  login(email: string, password: string) {
    return this.httpClient
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAuthKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((response: any) => {
          Storage.set({
            key: this.TokenKeyName,
            value: response.idToken,
          }).then(() => {
            this._isAuthenticated.next(true);
            this._userId = response.localId;
          });
        })
      );
  }

  logout() {
    Storage.remove({
      key: this.TokenKeyName,
    }).then(() => {
      this._isAuthenticated.next(false);
      this._userId = null;
      this.router.navigateByUrl("/auth");
    });
  }
}
