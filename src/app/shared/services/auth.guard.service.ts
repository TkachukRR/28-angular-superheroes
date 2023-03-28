import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router, private message: MessageService) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.checkAuthenticated()) {
			return true;
		}
		this.message.warning('login again');
		void this.router.navigate(['login']);

		return false;
	}
}
