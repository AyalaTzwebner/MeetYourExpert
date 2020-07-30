import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expert } from 'src/app/classes/expert';
import { Meeting } from 'src/app/classes/meeting';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-expert-meetings',
  templateUrl: './expert-meetings.component.html',
  styleUrls: ['./expert-meetings.component.scss']
})
export class ExpertMeetingsComponent implements OnInit {

@Input() expert:Expert;
detailsForm:FormGroup;
approvedMeetigns:Meeting[];
unapprovedMeetings:Meeting[];
  constructor(private formBuilder:FormBuilder,private meetingService:MeetingService) { 
    this.meetingService.getMeetingsForExpert(12).subscribe((res:Meeting[])=>{
      this.approvedMeetigns=res.filter(m=>m.isApproved==true);
      this.unapprovedMeetings=res.filter(m=>m.isApproved==false);
    },err=>console.log(err));
  }

  ngOnInit(): void {
    
  }
  unDisabledFoem():void{

  }
}
