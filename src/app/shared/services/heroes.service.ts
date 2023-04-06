import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces';

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
	public recentSearches: string[] = [];

	constructor(private http: HttpClient) {}

	public getByName(name: string) {
		this.loading = true;

		return this.http.get<HeroesSuccessResponse | HeroesErrorResponse>(`${BASE_URL}/api.php/${TOKEN}/search/${name}`);
	}

	public getById(id: number) {
		this.loading = true;

		return this.http.get<Hero | HeroesErrorResponse>(`${BASE_URL}/api.php/${TOKEN}/${id}`);
	}

	public getRecentSearches(): string[] {
		return this.recentSearches;
	}

	public addRecentSearch(recentSearch: string): void {
		if (this.recentSearches.includes(recentSearch)) {
			this.recentSearches = this.recentSearches.filter((search: string) => search !== recentSearch);
		}

		if (this.recentSearches.length > 4) {
			this.recentSearches.shift();
		}

		this.recentSearches = [...this.recentSearches, recentSearch];
	}
}
