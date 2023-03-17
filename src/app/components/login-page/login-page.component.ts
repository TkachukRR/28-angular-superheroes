import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/custom.validators";
import {LocalStorageService} from "../../shared/services/localStorage.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup
  submitted!: false

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
          CustomValidators.supportsDomains(['.com', '.net', '.org', '.co', '.us']) as ValidatorFn,
          CustomValidators.maxLengthAfterAt(5) as ValidatorFn,
          CustomValidators.allowedDotsBeforeAt(3) as ValidatorFn,
        ]
      ),
      password :new FormControl('',
        [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/(?=[A-Za-z0-9$%.&!]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%.&!]).*$/),
      ])
    })
  }

  submit() {
    console.log(this.loginForm)
  }
}
