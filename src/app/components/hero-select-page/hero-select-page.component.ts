import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-hero-select-page',
	templateUrl: './hero-select-page.component.html',
	styleUrls: ['./hero-select-page.component.scss']
})
export class HeroSelectPageComponent implements OnInit {
	public searchForm!: FormGroup;

	constructor() {}

	public ngOnInit(): void {
		this.searchForm = new FormGroup({
			searchInput: new FormControl('')
		});
	}

	public searchHero() {

	}
}
