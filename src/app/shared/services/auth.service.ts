import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
	constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

	public login(): void {
		const expDate: Date = new Date(new Date().getTime() + 3600 * 1000);

		this.localStorageService.setUserSession(expDate);
	}

	public logout(): void {
		this.localStorageService.removeUserSession();
	}

	public checkAuthenticated(): boolean {
      if (this.localStorageService.getUserSession() === '' || new Date(this.localStorageService.getUserSession()) < new Date()) {

      	return false;
      }

      return true;
	}
}
