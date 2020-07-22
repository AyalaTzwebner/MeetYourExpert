import { Component, OnInit } from '@angular/core';
import { Recommend } from 'src/app/classes/recommend';
import { RecommendsService } from 'src/app/services/recommends.service';
import { UsersService } from 'src/app/services/users.service';
import { ExpertsService } from 'src/app/services/experts.service';
import { User } from 'src/app/classes/user';
import { Expert } from 'src/app/classes/expert';

@Component({
  selector: 'app-manager-recommends',
  templateUrl: './manager-recommends.component.html',
  styleUrls: ['./manager-recommends.component.scss']
})
export class ManagerRecommendsComponent implements OnInit {

  recommends : Recommend[];
  user:User;
  expert:User;
  constructor(private recommendService:RecommendsService, private userService:UsersService, private expertService:ExpertsService) {
      this.recommendService.getAllRecommends().subscribe( (res:Recommend[]) => this.recommends = res);
   }

  ngOnInit(): void {
  }
  getUser(id:number):string
  {
    this.user = this.userService.getUserById(id);
    let name:string = this.user.userName;
    return name;
  }
  getExpert(id:number):string
  {
    this.expert = this.userService.getUserById(id);
    let name:string = this.expert.userName;
    return name;
  }

  getButtonValue(f:boolean):string{
     if(!f)
         return "אשר המלצה";
    return "הסר המלצה";
  }
  
  changeStatus(id:number, currentStstus:boolean){
      if(status)
      alert("approved");
      else
      alert("notapproved")
  }

}
