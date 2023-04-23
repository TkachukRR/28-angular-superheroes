import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../shared/interfaces';
import { UserSessionService } from '../../shared/services/user-session.service';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-favourite-hero-card',
	templateUrl: './favourite-hero-card.component.html',
	styleUrls: ['./favourite-hero-card.component.scss']
})
export class FavouriteHeroCardComponent implements OnInit {
	public isFavourite = false;
	public isSelected = false;
	public fightsQuantity = 0;
	public winsQuantity = 0;
	public defeatsQuantity = 0;
	@Input() hero!: Hero;

	constructor(private userSession: UserSessionService, private storageService: LocalStorageService, private router: Router) {}

	public ngOnInit(): void {
		if (this.hero.fights) {
			this.fightsQuantity = this.hero.fights?.length;
			this.winsQuantity = this.hero.fights?.filter(fight => fight.win === 'true').length;
			this.defeatsQuantity = this.hero.fights?.filter(fight => fight.win === 'false').length;
		}
	}

	public removeFromFavourites(id: string) {
		this.userSession.removeFromFavourites(id);
		this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
	}

	public setIsFavourite() {
		this.isFavourite = this.userSession.getFavourites().some((hero: Hero) => hero.id === this.hero.id);
	}

	public checkIsFavourite(): boolean {
		this.setIsFavourite();

		return this.isFavourite;
	}

	public addToSelected(id: string) {
		this.userSession.setSelectedHero(id);
		this.setIsFavourite();

		if (!this.isFavourite) {
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

	public showHeroInfo(heroName: string) {
		void this.router.navigate(['/hero-info', heroName]);
	}
}
