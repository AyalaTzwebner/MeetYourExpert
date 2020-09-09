import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expert } from 'src/app/classes/expert';
import { Meeting } from 'src/app/classes/meeting';
import { MeetingService } from 'src/app/services/meeting.service';
import { ExpertsService } from 'src/app/services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import {AddMeetingComponent} from 'src/app/add-meeting/add-meeting.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expert-meetings',
  templateUrl: './expert-meetings.component.html',
  styleUrls: ['./expert-meetings.component.scss']
})
export class ExpertMeetingsComponent implements OnInit {

  expert: Expert;
  detailsForm: FormGroup;
  approvedMeetigns: Meeting[]=[];
  unapprovedMeetings: Meeting[]=[];
  buttonContent:string = " ";
  canceling:boolean=false;
  constructor(private formBuilder: FormBuilder, private meetingService: MeetingService, private experts: ExpertsService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    // this.approvedMeetigns.push(new Meeting(1,27,23,"abcd",new Date("12/08/2020")));
    // this.unapprovedMeetings.push(new Meeting(2,27,24,"ABCD",new Date("01/09/2020")))
     this.activatedRoute.paramMap.subscribe(res => {
       this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
         this.expert = res[0];
         this.meetingService.getMeetingsForExpert(this.expert.id).subscribe((res: Meeting[]) => {
           this.approvedMeetigns = res.filter(m => m.isApproved == true);
           this.unapprovedMeetings = res.filter(m => m.isApproved == false);    
           console.log(res);
         }, err => console.log(err));
       }, err => console.log(err));
     });
  }

  ngOnInit(): void {

  }
  unDisabledFoem(): void {
  }

  changeStatusOfMeeting(meet:Meeting){
      if(!meet.isApproved){
        meet.isApproved=true;
        this.meetingService.approveMeeting(meet).subscribe();
      }
      else{
        this.canceling=true;
        meet.isApproved=false;
       
      }
  }
  deleteMeeting(meet:Meeting){
     this.meetingService.cancelMeeting(meet).subscribe(
       res=>this.canceling=false
     );
  }
  cancelMeeting(meet:Meeting){
    meet.isApproved=false;
  }

  openDialog(m:Meeting):void
  {
      const dialogRef = this.dialog.open(AddMeetingComponent, { data: { id: this.expert.id, updating:false, isExpert:true, userId:m.idUser} });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

