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

	public addNewUserSession(newUserSession: Session): void {
		const sessions = localStorage.getItem('sessions');
		if (sessions) {
			localStorage.setItem('sessions', JSON.stringify([...JSON.parse(sessions), newUserSession]));

			return;
		}

		localStorage.setItem('sessions', JSON.stringify([newUserSession]));
	}

	public getUserSession(userEmail: string) {
		const sessions = localStorage.getItem('sessions');
		if (sessions) {
			return JSON.parse(sessions).filter((session: Session) => session.email === userEmail);
		}

		return null;
	}

	public removeUserSession(userEmail: string) {
		const sessions = localStorage.getItem('sessions');
		if (!sessions) {
			return;
		}
		const filteredSessions = JSON.parse(sessions).filter((session: Session) => session.email !== userEmail);
		this.setSessions([...filteredSessions]);
	}

	public getSessions(): Array<Session> | [] {
		const sessions = localStorage.getItem('sessions');
		if (sessions) {
			return JSON.parse(sessions);
		}

		return [];
	}

	public setSessions(sessions: Array<Session>) {
		localStorage.setItem('sessions', JSON.stringify([...sessions]));
	}
}
