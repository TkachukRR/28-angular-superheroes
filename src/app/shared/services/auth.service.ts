import { Injectable } from '@angular/core'
import { LocalStorageService } from "./localStorage.service";

@Injectable()
export class AuthService{
  constructor(private localStorageService: LocalStorageService) {
  }

  public login(userEmail: string){
    this.localStorageService.addUsersSessionExpiresDate(userEmail);
  }

  public logout(){}

  public checkAuthStatus(){}
}
