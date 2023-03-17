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
  loginForm: FormGroup = new FormGroup({})
  submitted = false
  isRegistered = false

  constructor(public localStorageService: LocalStorageService) {
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
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(([a-z]+(-[a-z]+))*|^(([a-z]+|[a-z])+([A-Z][a-z]+|[A-Z])))$/),
      ])
    })
  }

  submit() {
    console.log(this.loginForm)
    this.setActualRegisteredStatus(this.loginForm.value['email'])
    console.log(this.isRegistered)
  }

  setActualRegisteredStatus(email: string): void{
    const registered: Array<string> = this.localStorageService.getRegisteredEmails()
    if (registered.includes(email)) {
      this.isRegistered = true
      return
    }
    this.isRegistered = false
  }

  checkRegisteredStatus():boolean{
    this.setActualRegisteredStatus(this.loginForm.value['email'])
    return this.isRegistered
  }
}
