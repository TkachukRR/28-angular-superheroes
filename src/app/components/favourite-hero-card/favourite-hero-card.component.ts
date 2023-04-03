import { Component, Input } from '@angular/core';
import { Hero } from "../../shared/interfaces";

@Component({
  selector: 'app-favourite-hero-card',
  templateUrl: './favourite-hero-card.component.html',
  styleUrls: ['./favourite-hero-card.component.scss']
})
export class FavouriteHeroCardComponent {
  @Input() hero!: Hero;
}
