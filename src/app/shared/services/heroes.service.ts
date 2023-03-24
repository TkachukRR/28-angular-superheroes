import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces';
import { MessageService } from './message.service';

const BASE_URL = 'https://www.superheroapi.com';
const TOKEN = '882862659490279';

export interface HeroesSuccessResponse {
	response: 'success';
	results: any;
	'results-for': string;
}

export interface HeroesErrorResponse {
	response: 'error';
	error: string;
}

@Injectable()
export class HeroesService {
	public heroes!: Array<Hero>;
  public isSuccessfulSearch = false;
  public loading = false;

	constructor(private http: HttpClient, private message: MessageService) {}

	public getByName(name: string) {
    this.loading = true;
		this.http
			.get<HeroesSuccessResponse | HeroesErrorResponse>(`${BASE_URL}/api.php/${TOKEN}/search/${name}`)
			.subscribe(response => {
        this.loading = false;

				if (response.response === 'success') {
          this.isSuccessfulSearch = true;
					this.heroes = response.results;
          console.log(this.heroes)
				}

				if (response.response === 'error') {
          this.isSuccessfulSearch = false;
          this.heroes = [];
					this.message.warning('No someone hero`s name includes yor search');
				}
			});
	}
}
