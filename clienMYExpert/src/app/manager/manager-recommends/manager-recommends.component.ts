import { Component, OnInit } from '@angular/core';
import { Recommend } from 'src/app/classes/recommend';
import { RecommendsService } from 'src/app/services/recommends.service';
import { UsersService } from 'src/app/services/users.service';
import { ExpertsService } from 'src/app/services/experts.service';
import { User } from 'src/app/classes/user';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-manager-recommends',
  templateUrl: './manager-recommends.component.html',
  styleUrls: ['./manager-recommends.component.scss']
})
export class ManagerRecommendsComponent implements OnInit {

  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;
  recommends : Recommend[];
  user:User;
  expert:User;
  users:User[];
  experts:User[];
  constructor(private recommendService:RecommendsService, private userService:UsersService, private expertService:ExpertsService) {
      // this.recommendService.getAllRecommends().subscribe( (res:Recommend[]) => this.recommends = res); --slashed today wednesday, return if not working
   }

  ngOnInit(): void {
    this.recommendService.getPerPage(3, 0).subscribe(
      (res: any) => {

        this.recommends = res.results;
        this.pageIndex = res.pagination.current;
        this.pageSize = res.pagination.perPage;
        this.length = res.pagination.length;
      },
      err => {
          console.log(err);
      }
    )
    
  }



  changeStatus(r:Recommend){
      this.recommendService.changeStatus(r).subscribe();
      r.isApproved = !r.isApproved;
  }

  getButtonColor(isApproved:boolean){
      let color:string = isApproved ? 'green':'red';
      return color;
  }

  public getServerData(event?: PageEvent) {

    this.recommendService.getPerPage(event.pageSize, event.pageIndex).subscribe(
      (res: any) => {
        this.recommends = res.results;
        this.pageIndex = res.pagination.current;
        this.pageSize = res.pagination.perPage;
        this.length = res.pagination.length;
      },
      err => {
        console.log(err)
      }
    );
    return event;
  }
// #b53f83
}
