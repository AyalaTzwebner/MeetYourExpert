import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit {
  user: User = new User()
  fname: string;
  lname: string;
  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {

  }
  postUser(): void {
    this.user.userName=this.fname+" "+this.lname;
    console.log(this.user)
    this.userService.post(this.user).subscribe(res => alert("response: " + res), err => console.log(err))
  }

}
