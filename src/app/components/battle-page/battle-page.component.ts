import { Component, OnInit } from '@angular/core';
import { Hero, AvailablePowerup } from 'src/app/shared/interfaces';
import { PowerupsNames, PowerupsTitles } from 'src/app/shared/powersups.enums';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { RandomNumberService } from 'src/app/shared/services/random-number.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import {
	MAX_HERO_ID,
	MAX_HERO_RANDOM_POWER,
	MAX_OPPONENT_RANDOM_POWER,
	MAX_POWERUPS_WINNER_GETS,
	MIN_HERO_ID,
	MIN_HERO_RANDOM_POWER,
	MIN_OPPONENT_RANDOM_POWER
} from './battle-page.constants';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

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
	public showTimer = false;
	public winner!: Hero;
	public showWinneer = false;

	constructor(
		private userSession: UserSessionService,
		private heroesService: HeroesService,
		private number: RandomNumberService,
		private localStorageService: LocalStorageService
	) {}

	public ngOnInit(): void {
		this.setHero();
		this.setOpponent();
		this.setPowerups();
	}

	public fight() {
		const heroPower = this.calculatePower(this.hero);
		const opponentPower = this.calculatePower(this.opponent);

		const randomHeroPower = this.number.getRandomNumber(MIN_HERO_RANDOM_POWER, MAX_HERO_RANDOM_POWER);
		const randomOpponentPower = this.number.getRandomNumber(MIN_OPPONENT_RANDOM_POWER, MAX_OPPONENT_RANDOM_POWER);

		const totalHeroPower = heroPower + randomHeroPower;
		const totalOpponentPower = opponentPower + randomOpponentPower;
		this.showTimer = true;

		if (totalHeroPower > totalOpponentPower) {
			this.winner = this.hero;

			const winnerGetsPowerupsQuantity = this.number.getRandomNumber(0, MAX_POWERUPS_WINNER_GETS);
			const getRandomPowerup = () => {
				const powerupsArray = Object.entries(PowerupsTitles);
				const powerup = powerupsArray[this.number.getRandomNumber(0, powerupsArray.length - 1)];

				return {
					addPowerfull: 10,
					powerName: powerup[0].toLowerCase(),
					quantity: 1,
					title: powerup[1]
				};
			};

			for (let i = 0; i < winnerGetsPowerupsQuantity; i++) {
				this.userSession.addPowerup(getRandomPowerup() as AvailablePowerup);
			}
			this.userSession.addToFights(this.hero.id, this.opponent.name, 'true');
			this.localStorageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
		}

		if (totalHeroPower < totalOpponentPower) {
			this.winner = this.opponent;
			this.userSession.addToFights(this.hero.id, this.opponent.name, 'false');
			this.localStorageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
		}
	}

	public addPower(powerupName: PowerupsNames) {
		this.hero.powerstats[powerupName] = `${+this.hero.powerstats[powerupName] + 10}`;
		this.userSession.getPowerups().map(powerup => {
			if (powerup.powerName === powerupName) {
				powerup.quantity--;
			}

			this.userSession.checkPowerups();
		});
	}

	public onTimerFinished() {
		this.showTimer = false;
		this.showWinneer = true;
	}

	private setHero() {
		this.heroesService.getById(+this.userSession.getSelectedHero()).subscribe(response => {
			this.heroesService.loading = false;

			if (response.response === 'success') {
				this.heroesService.isSuccessfulSearch = true;
				this.hero = response;
				this.loadedHeroInfo = true;
			}
		});
	}

	private setOpponent() {
		const randomOpponentId = this.number.getRandomNumber(MIN_HERO_ID, MAX_HERO_ID);

		this.loadedOpponentInfo = false;
		this.heroesService.getById(randomOpponentId).subscribe(response => {
			this.heroesService.loading = false;

			if (response.response === 'success') {
				this.heroesService.isSuccessfulSearch = true;
				this.opponent = response;
				this.loadedOpponentInfo = true;
			}
		});
	}

	private setPowerups() {
		this.powerups = this.userSession.getPowerups();
	}

	private calculatePower(figter: Hero): number {
		const powers = Object.values(figter.powerstats);
		const totalPower = powers.reduce((total: number, power) => (total = total + +power), 0);

		return totalPower;
	}
}
