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
  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    // this.login = formBuilder.group({
    //   userName:[''],
    //   userPassword:[''],
    // })
   
  }
  log_in() {
    this.userService.login(this.user).subscribe(res=>alert(res),err=>console.log(err))
  }
  ngOnInit(): void {
  }

}
