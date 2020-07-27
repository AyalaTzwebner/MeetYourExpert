import { Component, OnInit } from '@angular/core';
import { Recommend } from 'src/app/classes/recommend';
import { RecommendsService } from 'src/app/services/recommends.service';
import { UsersService } from 'src/app/services/users.service';
import { ExpertsService } from 'src/app/services/experts.service';
import { User } from 'src/app/classes/user';


@Component({
  selector: 'app-manager-recommends',
  templateUrl: './manager-recommends.component.html',
  styleUrls: ['./manager-recommends.component.scss']
})
export class ManagerRecommendsComponent implements OnInit {

  recommends : Recommend[];
  user:User;
  expert:User;
  users:User[];
  experts:User[];
  constructor(private recommendService:RecommendsService, private userService:UsersService, private expertService:ExpertsService) {
      this.recommendService.getAllRecommends().subscribe( (res:Recommend[]) => this.recommends = res);
      // for(let r of this.recommends)
      // {
      //   this.userService.getUserById(r.userId).subscribe((res:User) => this.users.push(res) );
      //   this.userService.getUserById(r.profId).subscribe((res:User) => this.experts.push(res) );
      // }
      // alert('length: '+ this.users.length);
   }

  ngOnInit(): void {
  }
  getUser(id:number):string
  {
//  this.userService.getUserById(id).subscribe((res:User) => this.user = res);
//  if (this.user == undefined)
//     return id.toString();
//     return this.user.userName;
    return "soon";
  }
  getExpert(id:number):string
  {
    // this.userService.getUserById(id).subscribe((res:User) => this.expert = res);
    // if (this.user == undefined)
    // return id.toString();
    // return this.expert.userName;
    return "soon";

  }


  changeStatus(id:number, currentStstus:boolean, r:Recommend){
      r.isApproved = !r.isApproved;
      this.recommendService.changeStatus(id, currentStstus).subscribe();
      console.log(r);

  }

  getButtonColor(isApproved:boolean){
      let color:string = isApproved ? 'green':'red';
      return color;
  }
// #b53f83
}
