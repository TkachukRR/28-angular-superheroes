import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/custom.validators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup
  submitted!: false

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
      ])
    })
  }

  submit() {
    console.log(this.loginForm)
  }
}
