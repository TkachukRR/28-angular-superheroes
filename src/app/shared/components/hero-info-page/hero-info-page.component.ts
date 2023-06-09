import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces';
import { switchMap } from 'rxjs';

@Component({
	selector: 'app-hero-info-page',
	templateUrl: './hero-info-page.component.html',
	styleUrls: ['./hero-info-page.component.scss']
})
export class HeroInfoPageComponent implements OnInit {
	public hero!: Hero;
	public loading = true;
	public route$ = this.route.params;

	constructor(private route: ActivatedRoute, private heroService: HeroesService) {}

	public ngOnInit(): void {
		this.loading = true;
		this.heroService.loading = true;
		this.route.params
			.pipe(switchMap((params: Params) => this.heroService.getByName(params['heroName'])))
			.subscribe((response: any) => {
				if (response.response === 'success') {
					this.heroService.isSuccessfulSearch = true;
					this.loading = false;
					this.heroService.loading = false;

					[this.hero] = response['results'];
				}
			});
	}
}
