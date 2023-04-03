import { Component, Input } from '@angular/core';
import { Hero } from '../../shared/interfaces';
import { UserSessionService } from '../../shared/services/user-session.service';
import { LocalStorageService } from '../../shared/services/localStorage.service';

@Component({
	selector: 'app-favourite-hero-card',
	templateUrl: './favourite-hero-card.component.html',
	styleUrls: ['./favourite-hero-card.component.scss']
})
export class FavouriteHeroCardComponent {
	public isFavourite = false;
	public isSelected = false;
	@Input() hero!: Hero;

	constructor(private userSession: UserSessionService, private storageService: LocalStorageService) {}

	public removeFromFavourites(id: string) {
		this.userSession.removeFromFavourites(id);
		this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
	}

	public setIsFavourite() {
		const filteredFavourites = this.userSession.getFavourites().filter((hero: Hero) => hero.id === this.hero.id);

		if (filteredFavourites.length) {
			this.isFavourite = true;

			return;
		}
		this.isFavourite = false;
	}

	public checkIsFavourite(): boolean {
		this.setIsFavourite();

		return this.isFavourite;
	}

	public addToSelected(id: string) {
		this.userSession.setSelectedHero(id);
		const filteredFavourites = this.userSession.getFavourites().filter((hero: Hero) => hero.id === this.hero.id);

		if (!filteredFavourites.length) {
			this.userSession.addToFavourites(this.hero);
		}
		this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
		this.setIsSelected();
	}

	public setIsSelected() {
		this.isSelected = this.userSession.getSelectedHero() === this.hero.id;
	}

	public checkIsSelected(): boolean {
		this.setIsSelected();

		return this.isSelected;
	}
}
