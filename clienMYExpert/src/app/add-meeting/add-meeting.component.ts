import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  addMeetingForm: FormGroup;
  expertId:number
  constructor(private formBuilder: FormBuilder,private meetingService:MeetingService, private activatedRoute: ActivatedRoute) { 
    this.addMeetingForm = formBuilder.group({
      time: ['',[Validators.required]],
      date: ['',[Validators.required]],
      title:['',[Validators.required]],
      content:['']
    });
    this.activatedRoute.paramMap.subscribe(res =>
      this.expertId=Number(res.get("id"))
      ,err => console.log(err));
  }
  get time() {
    return this.addMeetingForm.get("time");
  }
  get date() {
    return this.addMeetingForm.get("date");
  }
  get title() {
    return this.addMeetingForm.get("title");
  }
  get content() {
    return this.addMeetingForm.get("content");
  }
  ngOnInit(): void {
  }
  addMeeting():void{
    let meet=new Meeting();
    meet.content=this.content.value;
    meet.title=this.title.value;
    meet.date=this.date.value;
    meet.time=this.time.value;
    meet.profId=this.expertId;
    this.meetingService.addMeeting(meet).subscribe(res=>console.log(res),err=>console.log(err))
  }
}
