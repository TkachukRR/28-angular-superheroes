import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionService } from './user-session.service';
import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})
export class CheckFavouritesGuard implements CanActivate {
	constructor(private userSession: UserSessionService, private router: Router, private message: MessageService) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.userSession.getFavourites().length > 0) {
			return true;
		}
		this.message.warning('Choose hero for battle.');
		void this.router.navigate(['user', 'search']);

		return false;
	}
}
