import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit {

  cities;
  constructor(private cityService:CitiesService) {
   }
  //  this.userService.login(this.user).subscribe(res=>alert("response: "+res),err=>console.log(err))
  ngOnInit(): void {
        this.cityService.getAllCities().subscribe(res=>this.cities=res,err=>console.log(err));
        console.log(this.cities);
  }

}
