import { Component, OnInit } from '@angular/core';
import { AvailablePowerup } from 'src/app/shared/interfaces';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
	selector: 'app-user-powersups',
	templateUrl: './user-powersups.component.html',
	styleUrls: ['./user-powersups.component.scss']
})
export class UserPowersupsComponent implements OnInit {
	public availablePowerups!: AvailablePowerup[];

	constructor(private userService: UserSessionService) {}

	ngOnInit(): void {
		this.setAvailablePowerups();
	}

	public setAvailablePowerups(): void {
		this.availablePowerups = this.userService.getPowerups();
	}
}
