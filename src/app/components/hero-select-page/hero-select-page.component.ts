import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../shared/services/heroes.service';

@Component({
	selector: 'app-hero-select-page',
	templateUrl: './hero-select-page.component.html',
	styleUrls: ['./hero-select-page.component.scss']
})
export class HeroSelectPageComponent implements OnInit {
	public searchForm!: FormGroup;
  public keyboardVisible = false;
  @Input() keyboardButtonValue = 'A';

	constructor(public heroes: HeroesService) {}

	public ngOnInit(): void {
		this.searchForm = new FormGroup({
			searchInput: new FormControl('', [
        Validators.required,
        Validators.pattern( /^[a-zA-Z]+$/  )
      ])
		});
	}

	public searchHero() {
		const inputValue = this.searchForm.controls?.['searchInput'].value;
		this.heroes.getByName(inputValue);
	}

  public toggleShowKeyboard() {
    this.keyboardVisible = !this.keyboardVisible;
  }

  public onResentSearch(recentSearch: string){
    this.searchForm = new FormGroup({
      searchInput: new FormControl(recentSearch)
    });
    this.searchHero();
  }

  public setKeyboardButtonName(buttonValue: string) {
    this.keyboardButtonValue = buttonValue;
    this.toggleShowKeyboard();
  }
}
