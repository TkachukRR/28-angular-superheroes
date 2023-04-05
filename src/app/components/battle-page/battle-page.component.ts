import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/shared/interfaces';
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

	constructor(
		private userSession: UserSessionService,
		private heroesService: HeroesService,
		private number: RandomNumberService
	) {}

	public ngOnInit(): void {
		this.setHero();
		this.setOpponent();
	}

	public fight() {
		console.log(this.hero);
		console.log(this.opponent);
	}

	private setHero() {
		this.heroesService.getById(+this.userSession.getSelectedHero()).subscribe(response => {
			if (response.response === 'success') {
				this.hero = response;
			}
		});
	}

	private setOpponent() {
		const randomOpponentId = this.number.getRandomNumber(MIN_HERO_ID, MAX_HERO_ID);

		this.heroesService.getById(randomOpponentId).subscribe(response => {
			if (response.response === 'success') {
				this.opponent = response;
			}
		});
	}
}
