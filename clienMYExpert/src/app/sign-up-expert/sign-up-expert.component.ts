import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { SubjectsService } from '../services/subjects.service';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { User } from '../classes/user';
import { Subject } from '../classes/subject';

@Component({
  selector: 'app-sign-up-expert',
  templateUrl: './sign-up-expert.component.html',
  styleUrls: ['./sign-up-expert.component.scss']
})
export class SignUpExpertComponent implements OnInit {
  cities;
  subjects:any;
  expert: Expert = new Expert();
  fname: string;
  lname: string;
  currentSubject: any;
  constructor(private cityService: CitiesService, private subjectService: SubjectsService, private expertService: ExpertsService) { }


  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(res =>
      this.cities = res, err => console.log(err));
    console.log(this.cities);
    this.subjectService.getAllSubjects().subscribe(res =>
      this.subjects = res, err => console.log(err));
  }
  signup() {
    this.expert.userName = this.fname + " " + this.lname;
    this.expertService.signup(this.expert).subscribe(res => console.log("response: " + res), err => console.log(err))
  }
  onSubjectChanged(selectedName: string): any {
    return this.subjects.find(s => s.subName === selectedName);
  }
}
