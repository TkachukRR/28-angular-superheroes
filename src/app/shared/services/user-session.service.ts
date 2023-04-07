import { Injectable } from '@angular/core';
import { AvailablePowerup, Fight, Hero, RegisteredUser } from '../interfaces';
import { LocalStorageService } from './localStorage.service';

@Injectable({
	providedIn: 'root'
})
export class UserSessionService {
	public userId: number = this.localStorageService.getUserSession().userId;
	public activeUser: RegisteredUser = this.localStorageService.getFullUserInfoById(this.userId);

	constructor(private localStorageService: LocalStorageService) {}

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
		const fight: Fight = { date: '', opponentName: '', win: 'false' };
		const newHero: Hero = { ...hero, fights: [fight] };
		this.activeUser.favourites = [...this.activeUser.favourites, newHero];
	}

	public removeFromFavourites(id: string): void {
		this.activeUser.favourites = this.activeUser.favourites.filter((hero: Hero) => hero.id !== id);
	}

	public getFavourites(): Hero[] {
		return this.activeUser.favourites;
	}

	public getPowerups(): AvailablePowerup[] {
		return this.activeUser.powerUps;
	}

	public checkPowerups(): void {
		this.activeUser.powerUps = this.activeUser.powerUps.filter(powerup => powerup.quantity > 0);
	}
}
