import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../services/cities.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { MeetingService } from '../services/meeting.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Meeting } from '../classes/meeting';
import { IfStmt } from '@angular/compiler';
import { RecommendsService } from '../services/recommends.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  profPicture:string = "assets/images/users/";
  alternativePicture:string = "http://turag.co.il/wp-content/uploads/2018/06/man.jpg";
  expert: Expert;
  cityString:string;
  not_clicked:boolean = true;
  currentUserMeeting: Meeting = null
  notMe:boolean = true;
  recommendsNumber:any = false;
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute,private cityService:CitiesService, public dialog: MatDialog, private meetingService: MeetingService, private recommendService:RecommendsService) {
    // this.expert = new Expert(20, "דוד שרוני", "davidddd", "davidsharoni@gmail.com",26, 2, "https://cdn1.pro.co.il/prod/images/Business/ProfilePicture/115/4d5d83955a5d12e67fd2e07de94978b6.jpg", "מריו אינסטלציה", "מריו אינסטלציה עוסק במגוון תחומים על קו האינסטלציה עם שימת דגש על איכות חומרים, מחירים שפויים ויחס אישי ואדיב", 3.74)
    this.activatedRoute.paramMap.subscribe(res => {
      this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
      this.expert = res[0];
      this.cityString=cityService.getCityById(this.expert.city).name
    //שליפה של מספר הממליצים
      this.recommendService.countRecommends(this.expert.id).subscribe( (res:any) => {this.recommendsNumber = res[0]; console.log(this.recommendsNumber)});
    // שליפה של הפגישה אם יש
      let user1 = localStorage.getItem("user")
      if (user1!=null&&user1!='null') {
        let user2 = JSON.parse(user1);
        if(user2.id==this.expert.id)
            this.notMe=false;
        this.meetingService.findUserMeeting(user2.id, this.expert.id).subscribe((res: Meeting) => {
        if (res) {
           this.currentUserMeeting = res;
         }
       }, err => console.log(err))
     }
      },
        err => {
          console.log(err)
        })
    });
  }


  fullStars(): number[] {
    let arr: number[] = [];
    let full, empty, i: number;
    full=Math.floor(this.expert.scores );
    empty=Math.floor(5-this.expert.scores );
    for (i = 0; i < full; i++)
      arr.push(1);
    if (full + empty < 5)
      arr.push(0.5);
    for (i = 0; i < empty; i++)
      arr.push(0)
    return arr
  }

  clicked()
  {
    this.not_clicked = !this.not_clicked;
  }

  clickedTrue(){
    this.not_clicked = true;
  }
  ngOnInit(): void {
    this.meetingService.getExistedMeeting.subscribe(meet=>this.currentUserMeeting=meet)
    this.recommendService.getRecommend.subscribe(recommend=>{});
     
  }

  deleteMeeting(){
    this.meetingService.deleteMeeting(this.currentUserMeeting).subscribe(res=>{
      this.meetingService.getExistedMeeting.emit(null);
    },err=>console.log(err));
  }
  editMeeting():void{
    const dialogRef = this.dialog.open(AddMeetingComponent, { data: { id: this.expert.id , updating:true, isExpert:false} });
  }
  openDialog():void{
    let user = localStorage.getItem("user");
    if(!user||user=='null')
        {
          Swal.fire('אופס...', 'יש להרשם כדי לבצע פגישה', 'error');
          return;
        }
    const dialogRef = this.dialog.open(AddMeetingComponent, { data: { id: this.expert.id, updating:false, isExpert:false} });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
