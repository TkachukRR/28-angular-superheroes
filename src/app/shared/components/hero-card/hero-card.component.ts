import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces';

@Component({
	selector: 'app-hero-card',
	templateUrl: './hero-card.component.html',
	styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  public isFavourite = false;
  public isSelected = false;
	@Input() hero!: Hero;

  public addToFavourite(){
    this.isFavourite = !this.isFavourite;
  }

  public removeFromFavourites(){
    this.isFavourite = !this.isFavourite;
  }

  public addToSelected(){
    this.isSelected = !this.isSelected;
  }

  public removeFromSelected(){
    this.isSelected = !this.isSelected;
  }
}
