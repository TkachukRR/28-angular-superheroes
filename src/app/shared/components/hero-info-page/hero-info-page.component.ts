import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces';

@Component({
	selector: 'app-hero-info-page',
	templateUrl: './hero-info-page.component.html',
	styleUrls: ['./hero-info-page.component.scss']
})
export class HeroInfoPageComponent implements OnInit {
	public hero!: Hero;
	public loading = true;

	constructor(private route: ActivatedRoute, private heroService: HeroesService) {}

	public ngOnInit(): void {
		this.loading = true;
		this.route.params.subscribe((params: Params) => {
			this.heroService.getByName(params['heroName'].replace('_', ' ')).subscribe(response => {
				if (response.response === 'success') {
					this.loading = false;
					[this.hero] = response['results'];
				}
			});
		});
	}
}
