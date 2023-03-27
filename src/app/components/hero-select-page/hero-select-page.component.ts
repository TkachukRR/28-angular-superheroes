import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../shared/services/heroes.service';

@Component({
	selector: 'app-hero-select-page',
	templateUrl: './hero-select-page.component.html',
	styleUrls: ['./hero-select-page.component.scss']
})
export class HeroSelectPageComponent implements OnInit {
	public searchForm!: FormGroup;

	constructor(public heroes: HeroesService) {}

	public ngOnInit(): void {
		this.searchForm = new FormGroup({
			searchInput: new FormControl('')
		});
	}

	public searchHero() {
		const inputValue = this.searchForm.controls?.['searchInput'].value;
		this.heroes.getByName(inputValue);
	}

  public showKeyboard() {
  }
}
