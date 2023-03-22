import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  constructor(private auth: AuthService) {
  }
  public logout() {
    this.auth.logout();
  }
}
