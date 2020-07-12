import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // login: FormGroup;
  user:User=new User();
  nameinvalid:boolean;
  passwordinvalid:boolean;
  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    // this.login = formBuilder.group({
    //   userName:[''],
    //   userPassword:[''],
    // })
    this.nameinvalid = false;
   
  }
  log_in() {
    this.passwordValidation();
    this.userNameValidation();
    if (this.nameinvalid||this.passwordinvalid)
        return false;
    else
        this.userService.login(this.user).subscribe(res=>alert("response: "+res),err=>console.log(err))
  }
  userNameValidation():void{
    // alert((<HTMLInputElement>document.getElementById("nameField")).value);
    if ((<HTMLInputElement>document.getElementById("nameField")).value.length<1)
      {
          this.nameinvalid = true;
      }
        else
        this.nameinvalid = false;
  }
  passwordValidation():void{
    // alert((<HTMLInputElement>document.getElementById("passwordField")).value);
    if ((<HTMLInputElement>document.getElementById("passwordField")).value.length<1)
      {
          this.passwordinvalid = true;
      }
        else
        this.passwordinvalid = false;
  }
  ngOnInit(): void {
  }

}
