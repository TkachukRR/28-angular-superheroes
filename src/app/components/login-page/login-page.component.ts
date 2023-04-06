import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/custom.validators';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { RegisteredUser } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { UserSessionService } from '../../shared/services/user-session.service';
import { PowerupsNames, PowerupsTitles } from 'src/app/shared/powersups.enums';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	public loginForm: FormGroup = new FormGroup({});
	public submitted = false;
	public isRegistered = false;

	constructor(
		public localStorageService: LocalStorageService,
		private auth: AuthService,
		private router: Router,
		private message: MessageService,
		private session: UserSessionService
	) {}

	public ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				CustomValidators.supportsDomains(['.com', '.net', '.org', '.co', '.us']) as ValidatorFn,
				CustomValidators.maxLengthAfterAt(5) as ValidatorFn,
				CustomValidators.allowedDotsBeforeAt(3) as ValidatorFn
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(5),
				Validators.pattern(/(?=[A-Za-z0-9$%.&!]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%.&!]).*$/)
			]),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/^(([a-z]+(-[a-z]+))*|^(([a-z]+|[a-z])+([A-Z][a-z]+|[A-Z])))$/)
			])
		});
	}

	public singIn(): void {
		if (this.loginForm.value['email'].invalid || this.loginForm.value['password'].invalid) {
			this.message.warning('Sign in error, invalid parameters');

			return;
		}
		if (!this.isRegistered) {
			this.message.warning('Unregistered email');

			return;
		}

		const registeredUser: RegisteredUser = this.localStorageService.getFullUserInfoByEmail(this.loginForm.value['email'])[0];
		if (registeredUser.password !== this.loginForm.value['password']) {
			this.message.warning('Wrong password');

			return;
		}
		this.auth.login(this.loginForm.value['email']);
		this.session.setActiveUser(registeredUser);
		this.message.success('Sing in success');
		void this.router.navigate(['/user', 'search']);
	}

	public registrationNewUser(): void {
		if (this.loginForm.invalid) {
			this.message.warning('Registration error, invalid parameters');

			return;
		}
		if (this.isRegistered) {
			this.message.warning('This email used.');

			return;
		}

		const newUser: RegisteredUser = {
			id: new Date().getTime(),
			name: this.loginForm.value.name,
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
			favourites: [
				{
					id: '503',
					name: 'One-Above-All',
					powerstats: {
						intelligence: '100',
						strength: '100',
						speed: '100',
						durability: '100',
						power: '100',
						combat: '100'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/10374.jpg'
					},
					fights: [
						{
							date: 'Mon Apr 07 2023 14:52:42 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'HAN SOLO',
							win: 'true'
						}
					]
				},
				{
					id: '145',
					name: 'Cable',
					powerstats: {
						intelligence: '88',
						strength: '48',
						speed: '23',
						durability: '56',
						power: '100',
						combat: '80'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/40.jpg'
					},
					fights: [
						{
							date: 'Mon Apr 03 2023 14:52:43 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'ABE SAPIEN',
							win: 'false'
						}
					]
				},
				{
					id: '94',
					name: 'Black Abbott',
					powerstats: {
						intelligence: 'null',
						strength: 'null',
						speed: 'null',
						durability: 'null',
						power: 'null',
						combat: 'null'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/1049.jpg'
					},
					fights: [
						{
							date: 'Mon Apr 03 2023 14:52:44 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'BATGIRL V',
							win: 'false'
						}
					]
				},
				{
					id: '250',
					name: 'Fabian Cortez',
					powerstats: {
						intelligence: 'null',
						strength: 'null',
						speed: 'null',
						durability: 'null',
						power: 'null',
						combat: 'null'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/24.jpg'
					},
					fights: [
						{
							date: 'Mon Apr 03 2023 14:52:45 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'CHAMBER',
							win: 'false'
						}
					]
				},
				{
					id: '13',
					name: 'Ajax',
					powerstats: {
						intelligence: '56',
						strength: '48',
						speed: '35',
						durability: '80',
						power: '34',
						combat: '55'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/10422.jpg'
					},
					fights: [
						{
							date: 'Tue Apr 04 2023 00:43:28 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'ELEKTRA',
							win: 'true'
						}
					]
				},
				{
					id: '349',
					name: 'Jack Bauer',
					powerstats: {
						intelligence: 'null',
						strength: '43',
						speed: 'null',
						durability: 'null',
						power: 'null',
						combat: 'null'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/1203.jpg'
					},
					fights: [
						{
							date: 'Tue Apr 04 2023 00:43:30 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'FRANKLIN RICHARDS',
							win: 'false'
						}
					]
				},
				{
					id: '351',
					name: 'Jack-Jack',
					powerstats: {
						intelligence: '6',
						strength: '34',
						speed: '67',
						durability: '80',
						power: '100',
						combat: '6'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/871.jpg'
					},
					fights: [
						{
							date: 'Tue Apr 04 2023 00:43:32 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'HOWARD THE DUCK',
							win: 'false'
						}
					]
				},
				{
					id: '352',
					name: 'James Bond',
					powerstats: {
						intelligence: '88',
						strength: '13',
						speed: '17',
						durability: '35',
						power: '25',
						combat: '90'
					},
					image: {
						url: 'https://www.superherodb.com/pictures2/portraits/10/100/10404.jpg'
					},
					fights: [
						{
							date: 'Tue Apr 04 2023 00:43:35 GMT+0200 (Центральная Европа, летнее время)',
							opponentName: 'HIRO NAKAMURA',
							win: 'false'
						}
					]
				}
			],
			selectedHero: '145',
			powerUps: [
				{
					title: PowerupsTitles.Combat,
					powerName: PowerupsNames.Combat,
					addPowerfull: 10,
					quantity: 1
				},
				{
					title: PowerupsTitles.Intelligence,
					powerName: PowerupsNames.Intelligence,
					addPowerfull: 10,
					quantity: 2
				},
				{
					title: PowerupsTitles.Speed,
					powerName: PowerupsNames.Speed,
					addPowerfull: 10,
					quantity: 1
				}
			]
		};

		this.localStorageService.addNewUserToRegistered(newUser);
		this.message.success('Registration success');
	}

	public setActualRegisteredStatus(email: string): void {
		this.isRegistered = this.localStorageService.getRegisteredEmails().includes(email);
	}

	public checkRegisteredStatus(): boolean {
		this.setActualRegisteredStatus(this.loginForm.value['email']);

		return this.isRegistered;
	}
}
