
import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class ManagerLoginComponent implements OnInit {
  loginForm: FormGroup;
  details: any;
  user: User;
  somethingWrong: boolean = false;
  constructor(private userService: UsersService, private formBuilder: FormBuilder,private route: Router) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
  log_in() {
    console.log("login")
    this.userService.loginManager(this.loginForm.value).subscribe((res: User) => {
      if (res == null) {
        this.somethingWrong = true
      }
      else {
        this.user = res;
        localStorage.setItem("manager", JSON.stringify(this.user));
        this.route.navigateByUrl("/manager-settings");
      }
    }, err => console.log(err))
  }
  ngOnInit(): void {
  }
  check(): void {
    console.log(this.loginForm.value.email, ", ", this.loginForm.value.email.valid)
  }
  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'שדה חובה';
    }
    else if (this.password.hasError('minlength'))
      return ' סיסמא חייבת להיות בת 4 תוים לפחות'
    else return 'ערך לא חוקי'

  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'שדה חובה';
    }
    else if (this.email.hasError('email'))
      return 'כתובת מייל לא תקינה'
    else return 'ערך לא חוקי'

  }
}
