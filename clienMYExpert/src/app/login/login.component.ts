import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpertsService } from '../services/experts.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  details: any;
  user: User;
  somethingWrong: boolean = false;
  constructor(private userService: UsersService, private formBuilder: FormBuilder,private route: Router,private expertService:ExpertsService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
  log_in() {
    console.log("login")
    this.userService.login(this.loginForm.value).subscribe(res => {
      console.log(res)
      if (res.found==false) {
        this.somethingWrong = true;
      }
      else {
        this.user = res.user;
        if(res.expert==true)
            {
            localStorage.setItem("expert", JSON.stringify(this.user));        
            this.route.navigateByUrl("/experts");
          }
            else{
            localStorage.setItem("user", JSON.stringify(this.user));
            this.route.navigateByUrl("/experts");
          }
          
        
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