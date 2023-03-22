import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { LoginPageComponent } from '../../components/login-page/login-page.component';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router, private loginPage: LoginPageComponent) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.checkAuthenticated()) {
			return true;
		}

		// this.loginPage.message = 'erorr';
		this.router.navigate(['login']);

		return false;
	}
}
