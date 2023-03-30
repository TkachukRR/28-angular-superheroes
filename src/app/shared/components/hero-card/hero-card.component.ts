import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces';
import { UserSessionService } from '../../services/user-session.service';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
	selector: 'app-hero-card',
	templateUrl: './hero-card.component.html',
	styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  public isFavourite = false;
  public isSelected = false;
	@Input() hero!: Hero;

  constructor(
    private userSession: UserSessionService,
    private storageService: LocalStorageService
  ) {
  }

  public addToFavourite(hero: Hero){
    this.userSession.addToFavourites(hero);
    this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
  }

  public removeFromFavourites(id: string){
    this.userSession.removeFromFavourites(id);
    this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
  }

  public setIsFavourite(){
    const filteredFavourites = this.userSession.getFavourites().filter((hero: Hero) => hero.id === this.hero.id);

    if (filteredFavourites.length) {
      this.isFavourite = true;

      return;
    }
    this.isFavourite = false;
  }

  public checkIsFavourite(): boolean{
    this.setIsFavourite();

    return this.isFavourite;
  }

  public addToSelected(id: string){
    this.userSession.setSelectedHero(id);
    const filteredFavourites = this.userSession.getFavourites().filter((hero: Hero) => hero.id === this.hero.id);

    if (!filteredFavourites.length) {
      this.userSession.addToFavourites(this.hero);
    }
    this.storageService.updateRegisteredUserByEmail(this.userSession.getActiveUser());
    this.setIsSelected();
  }

  public setIsSelected(){
      this.isSelected = this.userSession.getSelectedHero() === this.hero.id;
  }

  public checkIsSelected(): boolean{
    this.setIsSelected();

    return this.isSelected;
  }
}
