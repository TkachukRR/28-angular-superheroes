import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
	constructor(private auth: AuthService) {}

	public ngOnInit(): void {
		console.log(this.auth.checkAuthenticated());
	}

	public logout() {
		this.auth.logout();
	}
}
