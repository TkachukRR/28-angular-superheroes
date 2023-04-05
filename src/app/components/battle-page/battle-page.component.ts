import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/shared/interfaces';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
	selector: 'app-battle-page',
	templateUrl: './battle-page.component.html',
	styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
	public hero!: Hero;
	public opponent!: Hero;

	constructor(private userSession: UserSessionService, private heroes: HeroesService) {}

	public ngOnInit(): void {
		// console.log(this.userSession.getSelectedHero());
	}
}
