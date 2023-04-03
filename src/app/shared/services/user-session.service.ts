import { Injectable } from '@angular/core';
import { Fight, Hero, RegisteredUser } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class UserSessionService {
	public activeUser!: RegisteredUser;

	constructor() {}

	public setActiveUser(user: RegisteredUser): void {
		this.activeUser = { ...user };
	}

	public getActiveUser() {
		return this.activeUser;
	}

	public setSelectedHero(heroId: string) {
		this.activeUser.selectedHero = heroId;
	}

	public getSelectedHero(): string {
		return this.activeUser.selectedHero;
	}

	public addToFavourites(hero: Hero): void {
    const fight: Fight = {date: '', opponentId: '', win: 'false'};
    const newHero: Hero = {...hero, fights: [fight]};
		this.activeUser.favourites = [...this.activeUser.favourites, newHero];
	}

	public removeFromFavourites(id: string): void {
		this.activeUser.favourites = this.activeUser.favourites.filter((hero: Hero) => hero.id !== id);
	}

	public getFavourites(): Hero[] {
		return this.activeUser.favourites;
	}
}
