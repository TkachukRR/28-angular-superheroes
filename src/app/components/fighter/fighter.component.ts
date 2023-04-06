import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-fighter',
	templateUrl: './fighter.component.html',
	styleUrls: ['./fighter.component.scss']
})
export class FighterComponent {
	@Input() public fighter!: Hero;
}
