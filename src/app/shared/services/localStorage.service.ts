import { Injectable } from '@angular/core';
import { ActiveUser, RegisteredUser } from '../interfaces';

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

	public updateRegisteredUserByEmail(newUserInfo: RegisteredUser) {
		const updatedUserInfo: RegisteredUser = this.getFullUserInfoByEmail(newUserInfo.email);
		updatedUserInfo.powerUps = newUserInfo.powerUps;
		updatedUserInfo.selectedHero = newUserInfo.selectedHero;
		updatedUserInfo.favourites = newUserInfo.favourites;

		const filteredRegisteredUsers = this.getRegisteredUsers().filter(
			(registeredUser: RegisteredUser) => registeredUser.email !== newUserInfo.email
		);

		localStorage.setItem('registeredUsers', JSON.stringify([...filteredRegisteredUsers, updatedUserInfo]));
	}

	public getFullUserInfoByEmail(email: string): RegisteredUser {
		return this.getRegisteredUsers().filter(registeredUser => registeredUser.email === email)[0];
	}

	public getFullUserInfoById(userId: number): RegisteredUser {
		return this.getRegisteredUsers().filter(registeredUser => registeredUser.id === userId)[0];
	}

	public setUserSession(activeUser: ActiveUser): void {
		localStorage.setItem('session', JSON.stringify(activeUser));
	}

	public removeUserSession() {
		localStorage.setItem('session', '');
	}

	public getUserSession(): ActiveUser {
		const sessions = localStorage.getItem('session');
		if (sessions) {
			return JSON.parse(sessions);
		}

		return {} as ActiveUser;
	}

	public clearUserSessionExpDate() {
		const activeUser = this.getUserSession();
		if (activeUser) {
			activeUser.expDate = new Date(0);
			this.setUserSession(activeUser);
		}
	}
}
