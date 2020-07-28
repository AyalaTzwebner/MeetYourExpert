import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting';
import { ActivatedRoute } from '@angular/router';
import { Expert } from '../classes/expert';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../classes/user';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  addMeetingForm: FormGroup;
  expertId: number;
  userId: number;
  existedMeeting: Meeting = null;
  constructor(private formBuilder: FormBuilder, private meetingService: MeetingService, private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Expert) {
    this.addMeetingForm = formBuilder.group({
      time: [this.existedMeeting ? this.existedMeeting.time : '', [Validators.required]],
      date: [this.existedMeeting ? this.existedMeeting.date : '', [Validators.required]],
      title: [this.existedMeeting ? this.existedMeeting.title : '', [Validators.required]],
      content: [this.existedMeeting ? this.existedMeeting.content : '']
    });
    let user = localStorage.getItem("user");
    let userData = JSON.parse(user);
    this.userId = userData.id;
    this.expertId = data.id;
    if (data.manager) {
      meetingService.findUserMeeting(this.userId, this.expertId).subscribe(meet => {
        this.existedMeeting = meet;
      }, err => console.log(err))
    }
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
  saveMeeting(): void {
    let meet = new Meeting();

    meet.userId = this.userId;
    meet.content = this.content.value;
    meet.title = this.title.value;
    meet.date = this.date.value;
    meet.time = this.time.value;
    meet.profId = this.expertId;
    if (this.existedMeeting) {
      meet.id=this.existedMeeting.id;
      this.meetingService.updateMeeting(meet).subscribe(res=>console.log(res),err=>console.log(err))
    }
    else {
      this.meetingService.addMeeting(meet).subscribe(res => {
        if (res.insertId) {
          this.meetingService.getExistedMeeting.emit(meet)
        }
        console.log(res)

      }, err => console.log(err));
    }

  }
}
