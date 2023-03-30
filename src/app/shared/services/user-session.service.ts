import { Injectable } from '@angular/core';
import { RegisteredUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public activeUser!: RegisteredUser;

  constructor() { }

  public setActiveUser(user: RegisteredUser): void{
    this.activeUser = {...user};
  }

  public getActiveUser(){
    return this.activeUser;
  }

  public setSelectedHero(heroId: string){
    this.activeUser.selectedHero = heroId;
  }

  public getSelectedHero(): string{
    return this.activeUser.selectedHero;
  }

  public addToFavourites(id: string): void{
    this.activeUser.favourites = [...this.activeUser.favourites, id];
  }

  public removeFromFavourites(id: string): void{
    this.activeUser.favourites = this.activeUser.favourites.filter(heroId => heroId !== id);
  }

  public getFavourites(): string[]{
    return this.activeUser.favourites;
  }
}
