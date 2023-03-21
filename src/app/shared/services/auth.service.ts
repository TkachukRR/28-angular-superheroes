import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { Session } from '../interfaces';

@Injectable()
export class AuthService {
	constructor(private localStorageService: LocalStorageService) {}

	public login(userEmail: string): void {
		const newUserSession: Session = {
			email: userEmail,
			expDate: new Date(new Date().getTime() + 3600 * 1000)
		};
		this.localStorageService.addNewUserSession(newUserSession);
	}

	public logout(userEmail: string): void {
		this.localStorageService.removeUserSession(userEmail);
	}

	public controlAuthStatuses(): void {
		const activeSessions = this.localStorageService
			.getSessions()
			.filter((session: { expDate: Date }) => new Date(session.expDate) > new Date());
		this.localStorageService.setSessions(activeSessions);
	}
}
