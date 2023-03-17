import {Injectable} from "@angular/core";
import {RegisteredUser} from "../interfaces";

@Injectable()
export class LocalStorageService{

  getRegisteredUsers(): Array<RegisteredUser> | [] {
    const registeredUsers = localStorage.getItem('registeredUsers')
    if (registeredUsers) {
      return JSON.parse(registeredUsers)
    }
    return []
  }

  addNewRegisteredUser(newUser: RegisteredUser): void{
    const registeredUsers = localStorage.getItem('registeredUsers')
    if (registeredUsers) {
      const users: Array<RegisteredUser> = JSON.parse(registeredUsers)
      localStorage.setItem('registeredUsers', JSON.stringify([ ...users, newUser]))
      return
    }
    localStorage.setItem('registeredUsers', JSON.stringify([newUser]))
  }

  checkForRegisteredEmail(newEmail: string):boolean{
      return (this.getRegisteredUsers()).some(registeredUser => registeredUser.email === newEmail)
  }
}
