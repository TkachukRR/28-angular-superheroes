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
}
