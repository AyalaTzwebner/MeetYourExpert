import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { User } from '../classes/user';
import { ExpertsService } from '../services/experts.service';
import { UsersService } from '../services/users.service';
import { Subject } from '../classes/subject';
import { City } from '../classes/city';
import { SubjectsService } from '../services/subjects.service';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-disp-experts',
  templateUrl: './disp-experts.component.html',
  styleUrls: ['./disp-experts.component.scss']
})
export class DispExpertsComponent implements OnInit {

  allexperts: Expert[];
  allCities: City[];
  allSubjects: Subject[];
  allParentsSubjects: Subject[];
  currentParentSubject: string;
  currentSubject: string;
  currentCity: string;
  name: string;
  constructor(private experts: ExpertsService, private users: UsersService,
    private cityService: CitiesService, private subjectService: SubjectsService) {

    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    this.experts.getAllExperts().subscribe(
      (res: Expert[]) => {
        this.allexperts = res;
        console.log(this.allexperts)
      },
      err => {
        console.log("some error:", err)
      })
  }

  ngOnInit(): void {
    this.allCities = this.cityService.getAllCities();
    //  this.allSubjects=this.subjectService.getAllSubjects();
    this.allParentsSubjects = this.subjectService.getAllParentsSubjects();
  }
  filter() {
    //TODO: currentParentSubject - add
    this.experts.filterExperts(this.currentSubject, this.currentCity, this.name).subscribe(
      (res: Expert[]) => {
        this.allexperts = res;
        console.log(this.allexperts)
      },
      err => {
        console.log("some error:", err)
      })
  }
  clear() {
    this.currentSubject = "";
    this.currentCity = "";
    this.name = "";
    this.currentParentSubject = "";
    this.experts.getAllExperts().subscribe(
      (res: Expert[]) => {
        this.allexperts = res;
        console.log(this.allexperts)
      },
      err => {
        console.log("some error:", err)
      })

  }
}
