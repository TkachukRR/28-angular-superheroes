import { Injectable } from '@angular/core';
import { RegisteredUser } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public activeUser!: RegisteredUser;

  constructor() { }

  public setActiveUser(user: RegisteredUser): void{
    this.activeUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      favourites: user.favourites,
      selectedHero: user.selectedHero,
      powerUps: user.powerUps
    };
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
}
