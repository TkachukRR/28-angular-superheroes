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

  public addUsersSessionExpiresDate(userEmail: string): void{
    const sessions = localStorage.getItem('sessions');
    const newSession: Session = {
      email: userEmail,
      expDate: new Date(new Date().getTime() + 3600 * 1000)
    };
    if (sessions) {
      localStorage.setItem('sessions', JSON.stringify([...JSON.parse(sessions), newSession]));

      return;
    }

    localStorage.setItem('sessions', JSON.stringify([newSession]));
  }
}
