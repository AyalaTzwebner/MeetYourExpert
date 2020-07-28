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


@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  expert: Expert;
  cityString: string;
  not_clicked: boolean = true;
  currentUserMeeting: Meeting = null
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute,
    private cityService: CitiesService, public dialog: MatDialog, private meetingService: MeetingService) {
    this.activatedRoute.paramMap.subscribe(res => {
      this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
        this.expert = res[0];
        console.log(this.expert)
        this.cityString = cityService.getCityById(this.expert.city).name;
        this.meetingService.getExistedMeeting.subscribe(meet=>this.currentUserMeeting=meet)
        // שליפה של הפגישה אם יש
        let user1 = localStorage.getItem("user")
        if (user1) { 
          let user2 = JSON.parse(user1);
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
    full = Math.floor(this.expert.scores);
    empty = Math.floor(5 - this.expert.scores);
    for (i = 0; i < full; i++)
      arr.push(1);
    if (full + empty < 5)
      arr.push(0.5);
    for (i = 0; i < empty; i++)
      arr.push(0)
    return arr
  }

  clicked() {
    this.not_clicked = !this.not_clicked;
  }

  clickedTrue() {
    this.not_clicked = true;
  }
  ngOnInit(): void {
  

  }
  openDialog() :void{
    const dialogRef = this.dialog.open(AddMeetingComponent, { data: { id: this.expert.id, manager:false} });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editMeeting():void{
    const dialogRef = this.dialog.open(AddMeetingComponent, { data: { id: this.expert.id , manager:true} });
  }
  deleteMeeting():void{
    this.meetingService.deleteMeeting(this.currentUserMeeting).subscribe(res=>{
      this.meetingService.getExistedMeeting.emit(null);
    },err=>console.log(err));
  }

}
