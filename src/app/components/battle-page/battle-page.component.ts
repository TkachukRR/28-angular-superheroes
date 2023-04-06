import { Component, OnInit } from '@angular/core';
import { Hero, AvailablePowerup } from 'src/app/shared/interfaces';
import { PowerupsNames } from 'src/app/shared/powersups.enums';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { RandomNumberService } from 'src/app/shared/services/random-number.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

const MIN_HERO_ID = 1;
const MAX_HERO_ID = 731;
@Component({
	selector: 'app-battle-page',
	templateUrl: './battle-page.component.html',
	styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
	public hero!: Hero;
	public opponent!: Hero;
	public loadedHeroInfo = false;
	public loadedOpponentInfo = false;
	public powerups!: AvailablePowerup[];

	constructor(
		private userSession: UserSessionService,
		private heroesService: HeroesService,
		private number: RandomNumberService
	) {}

	public ngOnInit(): void {
		this.setHero();
		this.setOpponent();
		this.setPowerups();
	}

	public fight() {
		console.log(this.hero);
		console.log(this.opponent);
	}

	public addPower(powerupName: PowerupsNames) {
		this.hero.powerstats[powerupName] = `${+this.hero.powerstats[powerupName] + 10}`;
		this.userSession.getPowerups().map(powerup => {
			if (powerup.powerName === powerupName) {
				powerup.quantity--;
			}
		});
	}

	private setHero() {
		this.loadedHeroInfo = false;
		this.heroesService.getById(+this.userSession.getSelectedHero()).subscribe(response => {
			if (response.response === 'success') {
				this.hero = response;
				this.loadedHeroInfo = true;
			}
		});
	}

	private setOpponent() {
		const randomOpponentId = this.number.getRandomNumber(MIN_HERO_ID, MAX_HERO_ID);

		this.loadedOpponentInfo = false;
		this.heroesService.getById(randomOpponentId).subscribe(response => {
			if (response.response === 'success') {
				this.opponent = response;
				this.loadedOpponentInfo = true;
			}
		});
	}

	private setPowerups() {
		this.powerups = this.userSession.getPowerups();
	}
}
