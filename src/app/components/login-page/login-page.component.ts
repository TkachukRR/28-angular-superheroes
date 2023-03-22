import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/custom.validators';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { RegisteredUser } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';

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
		private message: MessageService
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

		this.localStorageService.getFullUserInfoByEmail(this.loginForm.value['email']);
		const registeredUser: RegisteredUser = this.localStorageService.getFullUserInfoByEmail(this.loginForm.value['email'])[0];
		if (registeredUser.password !== this.loginForm.value['password']) {
			this.message.warning('Wrong password');

			return;
		}
		this.auth.login();
		this.message.success('Sing in success');
		void this.router.navigate(['user']);
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

		this.localStorageService.addNewUserToRegistered(this.loginForm.value);
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
