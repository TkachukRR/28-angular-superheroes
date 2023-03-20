import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/custom.validators';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { RegisteredUser } from '../../shared/interfaces';
import { AuthService } from "../../shared/services/auth.service";

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
    public auth: AuthService
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

	public submit() {
		if (this.loginForm.value['email'].invalid || this.loginForm.value['password'].invalid) {
			console.error('Sign in error, invalid parameters');

			return; // show popup "Sign in error, invalid parameters"
		}
		if (!this.isRegistered) {
			console.error('Unregistered email');

			return; // show popup "This email registered."
		}

		this.localStorageService.getFullUserInfoByEmail(this.loginForm.value['email']);
		const registeredUser: RegisteredUser = this.localStorageService.getFullUserInfoByEmail(this.loginForm.value['email'])[0];
		if (registeredUser.password !== this.loginForm.value['password']) {
			console.error('Wrong password');

			return;
		}
		console.log('sing in success');
		// this.loginForm.reset()
		// redirect
    this.auth.login(this.loginForm.value['email']);
	}

	public registrationNewUser() {
		if (this.loginForm.invalid) {
			return; // show popup "Registration error, invalid parameters"
		}
		if (this.isRegistered) {
			return; // show popup "This email registered."
		}

		console.log('registration success');
		this.localStorageService.addNewUserToRegistered(this.loginForm.value);
	}

	public setActualRegisteredStatus(email: string): void {
		this.isRegistered = this.localStorageService.getRegisteredEmails().includes(email);
	}

	public checkRegisteredStatus(): boolean {
		this.setActualRegisteredStatus(this.loginForm.value['email']);

		return this.isRegistered;
	}
}
