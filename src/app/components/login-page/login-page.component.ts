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

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
          CustomValidators.supportsDomains(['.com', '.net', '.org', '.co', '.us']) as ValidatorFn,

        ]
      ),
      password :new FormControl('')
    })
  }

  submit() {
    console.log(this.loginForm)
  }
}
