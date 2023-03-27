import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../shared/services/heroes.service";
import { Hero } from "../../shared/interfaces";

@Component({
	selector: 'app-heroes-page',
	templateUrl: './heroes-page.component.html',
	styleUrls: ['./heroes-page.component.scss']
})
export class HeroesPageComponent implements OnInit{
  public heroes!: Array<Hero> ;

  constructor(private heroesService: HeroesService) {
  }

  public ngOnInit(): void {
    this.heroes = this.heroesService.heroes;
  }
}
