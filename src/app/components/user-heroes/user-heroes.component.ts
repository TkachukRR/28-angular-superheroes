import { Component } from '@angular/core';
import { Hero } from "../../shared/interfaces";
import { UserSessionService } from "../../shared/services/user-session.service";
import { LocalStorageService } from "../../shared/services/localStorage.service";
import { HeroesService } from "../../shared/services/heroes.service";

@Component({
  selector: 'app-user-heroes',
  templateUrl: './user-heroes.component.html',
  styleUrls: ['./user-heroes.component.scss']
})
export class UserHeroesComponent {
  public favouriteHeroes!: Array<Hero>;

  constructor(
    private userSession: UserSessionService,
    private storageService: LocalStorageService,
              ) {}

  private setFavouriteHeroes(){}
}
