import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/localStorage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private auth: AuthService, private localStorageService: LocalStorageService) {}
	public ngOnInit() {
		if (!this.localStorageService.getSessions()) {
			this.localStorageService.setSessions([]);
		}
		setInterval(() => {
			this.auth.controlAuthStatuses();
		}, 1000);
	}
}
