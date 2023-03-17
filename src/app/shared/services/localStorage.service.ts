export class LocalStorageService{

  getRegisteredUsers(){
    return localStorage.getItem('registeredUsers')
  }
}
