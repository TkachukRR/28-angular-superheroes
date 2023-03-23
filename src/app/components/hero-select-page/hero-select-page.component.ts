import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-hero-select-page',
  templateUrl: './hero-select-page.component.html',
  styleUrls: ['./hero-select-page.component.scss']
})
export class HeroSelectPageComponent {
  public searchForm!: FormGroup;


  public searchHero() {

  }
}
