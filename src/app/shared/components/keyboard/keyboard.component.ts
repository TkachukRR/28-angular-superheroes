import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { MessageService } from '../../services/message.service';
import { Hero } from '../../interfaces';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	public keys: string[] = [];
	@Output() public displayKeyValue: EventEmitter<string> = new EventEmitter<string>();

	constructor(private hero: HeroesService, private message: MessageService) {}

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
		this.hero.getByName(key).subscribe(response => {
			this.hero.loading = false;

			if (response.response === 'success') {
				this.hero.isSuccessfulSearch = true;
				this.hero.heroes = response.results.filter((hero: Hero) => hero.name.startsWith(key));
			}

			if (response.response === 'error') {
				this.hero.isSuccessfulSearch = false;
				this.hero.heroes = [];
				this.message.warning('No someone hero`s name includes yor search');
			}
		});
	}
}
