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
  nameinValid:boolean;
  passwordinvalid:boolean;
  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    // this.login = formBuilder.group({
    //   userName:[''],
    //   userPassword:[''],
    // })
    this.nameinValid = false;
   
  }
  log_in() {
    this.passwordValidation(' ');
    this.userNameValidation(' ');
    if (this.nameinValid||this.passwordinvalid)
        return false;
    else
        this.userService.login(this.user).subscribe(res=>alert("response: "+res),err=>console.log(err))
  }
  userNameValidation(msg:string):void{
    // alert((<HTMLInputElement>document.getElementById("nameField")).value);
    if ((<HTMLInputElement>document.getElementById("nameField")).value.length<1)
      {
          // alert(msg);
          this.nameinValid = true;
      }
        else
        this.nameinValid = false;
  }
  passwordValidation(msg:string):void{
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
