import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelfValidators} from "../../shared/self.validators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, SelfValidators.restrictedDomains, SelfValidators.lengthAfterAt]),
      password :new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.loginForm)
  }
}
