import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Hero } from "../interfaces";

const BASE_URL = 'https://www.superheroapi.com';
const TOKEN = '882862659490279';

export interface HeroesSuccessResponse{
  response: 'success';
  result: Array<Hero>;
  "results-for": string;
}

export interface HeroesErrorResponse{
  response: 'error';
  error: string;
}

@Injectable()
export class HeroesService{
  constructor(private http: HttpClient) {
  }

  public getByName(name: string){
    this.http.get(`${BASE_URL}/api.php/${TOKEN}/search/${name}`).subscribe( (response) => {
      console.log(response)
      }
    )
  }
}
