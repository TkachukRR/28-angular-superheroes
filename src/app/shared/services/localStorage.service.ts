import { Injectable } from '@angular/core';
import { RegisteredUser, Session } from '../interfaces';

@Injectable()
export class LocalStorageService {
	public getRegisteredUsers(): Array<RegisteredUser> | [] {
		const registeredUsers = localStorage.getItem('registeredUsers');
		if (registeredUsers) {
			return JSON.parse(registeredUsers);
		}

		return [];
	}

	public addNewUserToRegistered(newUser: RegisteredUser): void {
		const registeredUsers = localStorage.getItem('registeredUsers');
		if (registeredUsers) {
			const users: Array<RegisteredUser> = JSON.parse(registeredUsers);
			localStorage.setItem('registeredUsers', JSON.stringify([...users, newUser]));

			return;
		}
		localStorage.setItem('registeredUsers', JSON.stringify([newUser]));
	}

	public getRegisteredEmails(): Array<string> {
		return this.getRegisteredUsers().map(registeredUser => registeredUser.email);
	}

	public getFullUserInfoByEmail(email: string) {
		return this.getRegisteredUsers().filter(registeredUser => registeredUser.email === email);
	}

	public setUserSession(date: Date): void {
		localStorage.setItem('sessionActiveTo', JSON.stringify(date));
	}

	public removeUserSession() {
		localStorage.removeItem('sessionActiveTo');
	}

	public getUserSession(): string {
		const sessions = localStorage.getItem('sessionActiveTo');
		if (sessions) {
			return JSON.parse(sessions);
		}

		return '';
	}
}
