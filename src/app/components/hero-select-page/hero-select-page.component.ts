import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../shared/services/heroes.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
	selector: 'app-hero-select-page',
	templateUrl: './hero-select-page.component.html',
	styleUrls: ['./hero-select-page.component.scss']
})
export class HeroSelectPageComponent implements OnInit {
	public searchForm!: FormGroup;
	public keyboardVisible = false;
	public _keyboardButtonValue = 'A';
	@Input() public set keyboardButtonValue(value: string) {
		this._keyboardButtonValue = value;
	}

	constructor(public heroes: HeroesService, public message: MessageService) {}

	public ngOnInit(): void {
		this.searchForm = new FormGroup({
			searchInput: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])
		});
	}

	public searchHero() {
		const inputValue = this.searchForm.controls?.['searchInput'].value;
		this.heroes.getByName(inputValue).subscribe(response => {
			this.heroes.loading = false;

			if (response.response === 'success') {
				this.heroes.isSuccessfulSearch = true;
				this.heroes.heroes = response.results;
				this.heroes.addRecentSearch(response['results-for']);
			}

			if (response.response === 'error') {
				this.heroes.isSuccessfulSearch = false;
				this.heroes.heroes = [];
				this.message.warning('No someone hero`s name includes yor search');
			}
		});
	}

	public toggleShowKeyboard() {
		this.keyboardVisible = !this.keyboardVisible;
	}

	public onResentSearch(recentSearch: string) {
		this.searchForm.setValue({ ['searchInput']: recentSearch });
		this.searchHero();
	}

	public setKeyboardButtonName(buttonValue: string) {
		this._keyboardButtonValue = buttonValue;
		this.toggleShowKeyboard();
	}
}
