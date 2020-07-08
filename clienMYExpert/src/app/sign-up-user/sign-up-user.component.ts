import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { User } from '../classes/user';
import { UsersService } from '../services/users.service';
import { City } from '../classes/city';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit {
  user: User = new User()
  fname: string;
  lname: string;
  city:string
  allCities:City[];
  constructor(private cityService: CitiesService, private userService: UsersService) {
    console.log("Got here!")
    this.allCities=cityService.getAllCities();
  }
  //  this.userService.login(this.user).subscribe(res=>alert("response: "+res),err=>console.log(err))
  ngOnInit(): void {
  }

  postUser(): void {
    console.log(this.city)
    this.user.city=this.cityService.getCityByName(this.city);
    console.log(this.user.city)
    this.user.userName = this.fname + " " + this.lname;
    this.userService.post(this.user).subscribe(res => alert("response: " + res), err => console.log(err))
  }
}
 