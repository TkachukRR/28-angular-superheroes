import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../shared/services/heroes.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
	selector: 'app-hero-search-page',
	templateUrl: './hero-search-page.component.html',
	styleUrls: ['./hero-search-page.component.scss']
})
export class HeroSearchPageComponent implements OnInit {
	public searchForm!: FormGroup;
	public keyboardVisible = false;
	public _keyboardButtonValue = 'A';
	@Input() public set keyboardButtonValue(value: string) {
		this._keyboardButtonValue = value;
	}

	constructor(public heroesService: HeroesService, public message: MessageService) {}

	public ngOnInit(): void {
		this.heroesService.loading = false;
		this.heroesService.isSuccessfulSearch = false;

		this.searchForm = new FormGroup({
			searchInput: new FormControl('super', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])
		});
    this.searchHero();
    this.searchForm.reset();
	}

	public searchHero() {
		this.heroesService.loading = true;
		const inputValue = this.searchForm.controls?.['searchInput'].value;
		this.heroesService.getByName(inputValue).subscribe(response => {
			if (response.response === 'success') {
				this.heroesService.loading = false;
				this.heroesService.isSuccessfulSearch = true;
				this.heroesService.heroes = response.results;
				this.heroesService.addRecentSearch(response['results-for']);
			}

			if (response.response === 'error') {
				this.heroesService.loading = false;
				this.heroesService.isSuccessfulSearch = false;
				this.heroesService.heroes = [];
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
