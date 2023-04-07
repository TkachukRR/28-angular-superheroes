import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { ActiveUser } from '../interfaces';
import { MessageService } from './message.service';

@Injectable()
export class AuthService {
	constructor(private localStorageService: LocalStorageService, private message: MessageService) {}

	public login(userEmail: string): void {
		const userId = this.localStorageService.getFullUserInfoByEmail(userEmail).id;
		const activeUser: ActiveUser = {
			userId,
			expDate: new Date(new Date().getTime() + 3600 * 1000)
		};

		this.localStorageService.setUserSession(activeUser);
	}

	public logout(): void {
		this.localStorageService.clearUserSessionExpDate();
	}

	public checkAuthenticated(): boolean {
		if (
			!this.localStorageService.getUserSession() ||
			new Date(this.localStorageService.getUserSession().expDate).getTime() === new Date(0).getTime()
		) {
			return false;
		}
		if (new Date(this.localStorageService.getUserSession().expDate) < new Date()) {
			this.message.warning('login again');

			return false;
		}

		return true;
	}
}
