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
  validationArr:boolean[] = [];
  validflag:boolean;
  constructor(private cityService: CitiesService, private userService: UsersService) {
    console.log("Got here!")
    this.cityService.getAllCities().subscribe((res:City[])=>{
    this.allCities=res;},err=>console.log(err))
    for(let i=0;i<5;i++)
        this.validationArr.push(false);
    this.validflag = true;
  }
  //  this.userService.login(this.user).subscribe(res=>alert("response: "+res),err=>console.log(err))
  ngOnInit(): void {
  }

  postUser(): void {
    if (!this.isValid())
      return;
    this.user.city=this.cityService.getCityByName(this.city);
    console.log(this.user.city)
    this.user.userName = this.fname + " " + this.lname;
    this.userService.post(this.user).subscribe(res => alert("response: " + res), err => console.log(err))
  }
  isValid():boolean{
    var inputs = document.getElementsByTagName("input");
    let isValid:boolean;
    isValid = true;
    for (let i=0; i<inputs.length; i++ )
        if(this.validationArr[i])
        return false;
    for (let i=0; i<inputs.length; i++ )
    {
      if ((<HTMLInputElement>inputs[i]).value.length<1){
          this.validationArr[i]=true;
          isValid = false;}
      else
        this.validationArr[i]=false;
    }
    return isValid;
  }
  check(){
    
    if((<HTMLInputElement>event.target).value.length<=1)
    {
    this.validationArr[Number((<HTMLInputElement>event.target).id)]=true;
    return;
    }
    if((<HTMLInputElement>event.target).name=="email")
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test((<HTMLInputElement>event.target).value))
        {
          this.validationArr[Number((<HTMLInputElement>event.target).id)]=true;
          return;
        }
    if((<HTMLInputElement>event.target).name=="password")
        if ((<HTMLInputElement>event.target).value.length>10||(<HTMLInputElement>event.target).value.length<5)
        {
          this.validationArr[Number((<HTMLInputElement>event.target).id)]=true;
          return;
        }
    if((<HTMLInputElement>event.target).name=="city")
        if(!this.cityService.getCityByName((<HTMLInputElement>event.target).value))
        {
        this.validationArr[Number((<HTMLInputElement>event.target).id)]=true;
        return;
        }
    this.validationArr[Number((<HTMLInputElement>event.target).id)]=false;
    
  }
}
 