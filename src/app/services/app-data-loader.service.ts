import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AppDataLoaderService {
  constructor() {}

  loadInitialData(authService: AuthService) {
    return new Promise((resolve) => {
      if (!authService) {
        resolve(true);
      }
      authService.getUserInfo().subscribe((user) => {
        console.log("App initited");
        resolve(true);
      });
    });
  }
}

export function AppDataLoaderServiceFactory(
  provider: AppDataLoaderService,
  authService: AuthService
) {
  console.log(authService);

  return () => provider.loadInitialData(authService);
}
