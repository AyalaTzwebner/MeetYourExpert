import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expert } from 'src/app/classes/expert';

@Component({
  selector: 'app-expert-meetings',
  templateUrl: './expert-meetings.component.html',
  styleUrls: ['./expert-meetings.component.scss']
})
export class ExpertMeetingsComponent implements OnInit {

@Input() expert:Expert;
detailsForm:FormGroup;
  constructor(private formBuilder:FormBuilder) { 
    this.detailsForm = formBuilder.group({
      name: [this.expert.userName,[Validators.required]],
      password: [this.expert.userPassword,[Validators.required]],
      city:[this.expert.city,[Validators.required]],
      businessName:[this.expert.businessName,[Validators.required]],
      description:[this.expert.description,[Validators.required]]

    });
  }

  ngOnInit(): void {
    
  }
  unDisabledFoem():void{

  }
}
