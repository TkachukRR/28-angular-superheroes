import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	public keys: string[] = [];
	@Output() public displayKeyValue: EventEmitter<string> = new EventEmitter<string>();

	constructor(private hero: HeroesService) {}

	public ngOnInit() {
		this.generateKeyboardKeys();
	}

	public generateKeyboardKeys() {
		for (let i = 65; i <= 90; i++) {
			this.keys.push(String.fromCharCode(i));
		}
	}

	public searchHeroByFirstLetter(key: string) {
		this.displayKeyValue.emit(key);
		this.hero.getByFirstLetter(key);
	}
}
