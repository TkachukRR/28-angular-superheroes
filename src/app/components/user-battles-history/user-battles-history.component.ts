import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../shared/services/user-session.service';
import { FightHistory, Hero, SortedFights } from '../../shared/interfaces';
import { SortProperty } from './user-battles-sort-property.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-battles-history',
	templateUrl: './user-battles-history.component.html',
	styleUrls: ['./user-battles-history.component.scss']
})
export class UserBattlesHistoryComponent implements OnInit {
	public favourites!: Hero[];
	public fights: FightHistory[] = [];
	public sortedFights: FightHistory[] = [];
	public sortedFightsState: SortedFights = {
		sorted: SortProperty.NotSorted,
		isIncrease: false
	};
	public readonly sortProperty = SortProperty;

	constructor(public userSession: UserSessionService, private router: Router) {}

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

	public sortBy(property: SortProperty) {
		if (this.sortedFightsState.sorted === SortProperty.NotSorted || !this.sortedFightsState.isIncrease) {
			switch (property) {
				case SortProperty.Date:
					this.sortedFights.sort((a, b) => a.date.getTime() - b.date.getTime());
					break;

				case SortProperty.Hero:
					this.sortedFights.sort((a, b) => a.hero.localeCompare(b.hero));
					break;

				case SortProperty.Opponent:
					this.sortedFights.sort((a, b) => a.opponent.localeCompare(b.opponent));
					break;

				case SortProperty.Win:
					this.sortedFights.sort((a, b) => +a.win - +b.win);
					break;
			}

			this.sortedFightsState.sorted = property;
			this.sortedFightsState.isIncrease = true;

			return;
		}

		if (this.sortedFightsState.sorted !== SortProperty.NotSorted && this.sortedFightsState.isIncrease) {
			switch (property) {
				case SortProperty.Date:
					this.sortedFights.sort((a, b) => b.date.getTime() - a.date.getTime());
					break;

				case SortProperty.Hero:
					this.sortedFights.sort((a, b) => b.hero.localeCompare(a.hero));
					break;

				case SortProperty.Opponent:
					this.sortedFights.sort((a, b) => b.opponent.localeCompare(a.opponent));
					break;
				case SortProperty.Win:
					this.sortedFights.sort((a, b) => +b.win - +a.win);
					break;
			}

			this.sortedFightsState.isIncrease = false;

			return;
		}

		this.sortedFightsState.sorted = SortProperty.NotSorted;
		this.sortedFightsState.isIncrease = false;

		this.sortedFights = [...this.fights];
	}

	public showHeroInfo(heroName: string) {
		this.router.navigate(['/hero-info', heroName.trim().replace(' ', '_')]);
	}
}
