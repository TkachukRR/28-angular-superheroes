import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../../shared/services/user-session.service";
import { Fight, FightHistory, Hero } from "../../shared/interfaces";

@Component({
	selector: 'app-user-battles-history',
	templateUrl: './user-battles-history.component.html',
	styleUrls: ['./user-battles-history.component.scss']
})
export class UserBattlesHistoryComponent implements OnInit{
  public favourites!: Hero[];
  public fights: FightHistory[] = [];

  constructor(public userSession: UserSessionService) {
  }

  public ngOnInit() {
    this.favourites = this.userSession.getFavourites();
    this.setFights();

    console.log(this.fights);
  }

  public setFights(){
    this.favourites.map((hero: Hero) => {
      const fight: FightHistory = {
        date: new Date(),
        hero: '',
        opponent: '',
        win: false
      };
      console.log(fight);
      hero.fights?.map( oneFight => {
        console.log(oneFight);
        fight.date = new Date(oneFight.date);
        fight.hero = hero.name;
        fight.opponent = oneFight.opponentName;
        fight.win = JSON.parse(oneFight.win);
      });
      this.fights = [...this.fights, fight];
    });
  }
}
