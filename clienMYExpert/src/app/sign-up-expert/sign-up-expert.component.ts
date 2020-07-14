import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { SubjectsService } from '../services/subjects.service';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { User } from '../classes/user';
import { Subject } from '../classes/subject';
import { City } from '../classes/city';

@Component({
  selector: 'app-sign-up-expert',
  templateUrl: './sign-up-expert.component.html',
  styleUrls: ['./sign-up-expert.component.scss']
})
export class SignUpExpertComponent implements OnInit {
  allCities:City[];
  allSubjects:Subject[];
  expert: Expert = new Expert();
  fname: string;
  lname: string;
  currentSubject: string;
  currentCity:string;
  companyName:string;
  description:string;
  constructor(private cityService: CitiesService, private subjectService: SubjectsService, private expertService: ExpertsService) { }


  ngOnInit(): void {
    this.cityService.getAllCities().subscribe((res:City[])=>{
      this.allCities=res;}, err=>console.log(err))
    this.subjectService.getAllSubjects().subscribe((res:Subject[])=>this.allSubjects=res,err=>console.log(err));
  }
  signup() {
    this.expert.userName = this.fname + " " + this.lname;
    this.expert.proSubject=this.subjectService.getSubjectByName(this.currentSubject)
    this.expert.city=this.cityService.getCityByName(this.currentCity)
    this.expertService.signup(this.expert).subscribe(res => console.log("response: " + res), err => console.log(err))
  }
}
