import { Injectable } from '@angular/core';
import { RegisteredUser } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public activeUser = {};

  constructor() { }

  public setActiveUser(user: RegisteredUser): void{
    this.activeUser = {
      name: user.name,
      email: user.email,
      favourites: user.favourites,
      selectedHero: user.selectedHero,
      powerUps: user.powerUps
    };
  }

  public getActiveUser(){
    return this.activeUser;
  }
}
