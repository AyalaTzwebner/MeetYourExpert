import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-sign-up-expert',
  templateUrl: './sign-up-expert.component.html',
  styleUrls: ['./sign-up-expert.component.scss']
})
export class SignUpExpertComponent implements OnInit {
  cities;
  subjects;
  constructor(private cityService:CitiesService, private subjectService:SubjectsService) { }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(res=>this.cities=res,err=>console.log(err));
    console.log(this.cities);
    this.subjectService.getAllSubjects().subscribe(res=>this.subjects=res, err=>console.log(err));
  }

}
