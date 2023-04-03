import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../shared/services/user-session.service';
import { Fight, FightHistory, Hero } from '../../shared/interfaces';

@Component({
	selector: 'app-user-battles-history',
	templateUrl: './user-battles-history.component.html',
	styleUrls: ['./user-battles-history.component.scss']
})
export class UserBattlesHistoryComponent implements OnInit {
	public favourites!: Hero[];
	public fights: FightHistory[] = [];
	public sortedFights: FightHistory[] = [];
	public by: null | 'date' | 'hero' | 'opponent' | 'win' = null;
	public sortedFightsState = {
		isSorted: false,
		sortedBy: this.by,
		isIncrease: false
	};

	constructor(public userSession: UserSessionService) {}

	public ngOnInit() {
		this.favourites = this.userSession.getFavourites();
		this.setFights();
		this.sortedFights = [...this.fights];
	}

	public setFights() {
		this.favourites.map((hero: Hero) => {
			const fight: FightHistory = {
				date: new Date(),
				hero: '',
				opponent: '',
				win: false
			};
			hero.fights?.map(oneFight => {
				fight.date = new Date(oneFight.date);
				fight.hero = hero.name;
				fight.opponent = oneFight.opponentName;
				fight.win = JSON.parse(oneFight.win);
			});
			this.fights = [...this.fights, fight];
		});
	}

	public sortBy(property: 'date' | 'hero' | 'opponent' | 'win') {
		// console.log('0')
		// console.log(this.sortedFightsState)
		// console.log(this.fights)
		// console.log(this.sortedFights)

		if (!this.sortedFightsState.isSorted || this.sortedFightsState.sortedBy !== property) {
			switch (property) {
				case 'date':
					this.sortedFights.sort((a, b) => a.date.getTime() - b.date.getTime());
					break;

				case 'hero':
					this.sortedFights.sort((a, b) => a.hero.localeCompare(b.hero));
					break;

				case 'opponent':
					this.sortedFights.sort((a, b) => a.opponent.localeCompare(b.opponent));
					break;

				case 'win':
					this.sortedFights.sort((a, b) => +a.win - +b.win);
					break;
			}

			this.sortedFightsState.isSorted = true;
			this.sortedFightsState.sortedBy = property;
			this.sortedFightsState.isIncrease = true;

			console.log('1');
			console.log(this.sortedFightsState);
			console.log('fights', this.fights);
			console.log(this.sortedFights);

			return;
		}

		if (this.sortedFightsState.sortedBy === property && this.sortedFightsState.isIncrease) {
			switch (property) {
				case 'date':
					this.sortedFights.sort((a, b) => b.date.getTime() - a.date.getTime());
					break;

				case 'hero':
					this.sortedFights.sort((a, b) => b.hero.localeCompare(a.hero));
					break;

				case 'opponent':
					this.sortedFights.sort((a, b) => b.opponent.localeCompare(a.opponent));
					break;

				case 'win':
					this.sortedFights.sort((a, b) => +b.win - +a.win);
					break;
			}

			this.sortedFightsState.isIncrease = false;
			console.log('2');
			console.log(this.sortedFightsState);
			console.log('fights', this.fights);
			console.log(this.sortedFights);

			return;
		}

		this.sortedFightsState.isSorted = false;
		this.sortedFightsState.sortedBy = null;
		this.sortedFightsState.isIncrease = false;

		this.sortedFights = [...this.fights];
	}
}
