import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces';
import { UserSessionService } from "../../services/user-session.service";
import { LocalStorageService } from "../../services/localStorage.service";

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

  public addToFavourite(){
    this.isFavourite = !this.isFavourite;
  }

  public removeFromFavourites(){
    this.isFavourite = !this.isFavourite;
  }

  public addToSelected(id: string){
    this.isSelected = !this.isSelected;
    this.userSession.setSelectedHero(id);
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
