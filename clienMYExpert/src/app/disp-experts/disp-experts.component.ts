import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { User } from '../classes/user';
import { ExpertsService } from '../services/experts.service';
import { UsersService } from '../services/users.service';
import { Subject } from '../classes/subject';
import { City } from '../classes/city';
import { SubjectsService } from '../services/subjects.service';
import { CitiesService } from '../services/cities.service';
import { strict } from 'assert';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';

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
  allChildrenSubjects: Subject[];
  currentParentSubject: string;
  currentSubject: string;
  currentCity: string;
  name: string;
  param:Subject;

  citySelect = new FormControl();
  subjectSelect=new FormControl();
  categorySelect = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredCities: Observable<string[]>;
  filteredSubjects: Observable<string[]>;
  filteredCategories: Observable<string[]>;

  constructor(private experts: ExpertsService, private users: UsersService,
    private cityService: CitiesService, private subjectService: SubjectsService) {
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
    this.filteredCities = this.citySelect.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.allCities = this.cityService.getAllCities();
    this.allParentsSubjects = this.subjectService.getAllParentsSubjects();
    

  }
  filter() {
    //TODO: currentParentSubject - add
    const s = this.currentParentSubject && this.currentParentSubject!='' ? this.subjectService.getSubjectByName(this.currentParentSubject).toString() : '';
    const s1 = this.currentSubject && this.currentSubject!='' ? this.subjectService.getSubjectByName(this.currentSubject).toString(): '';
    
    const c = this.currentCity && this.currentCity!="" ? this.cityService.getCityByName(this.currentCity).toString(): '';
    const n = this.name && this.name!= '' ? this.name : '';
    this.experts.filterExperts(s,s1, c, n).subscribe(
      (res: Expert[]) => {
        this.allexperts = res;
        console.log(this.allexperts)
      },
      err => {
        console.log("some error:", err)
      })
  }
  clear() {
    this.citySelect.setValue("");
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
      getChildren():void
      {
        let s:number;
        s = this.subjectService.getSubjectByName(this.currentParentSubject);
        this.allChildrenSubjects = this.subjectService.getChildrenSubjects(s.toString());
      }
      getSubjectService():SubjectsService
      {
        return this.subjectService;
      }
      clearParent():void{
          this.currentParentSubject = "";
      }
      clearChild():void
      {
        this.currentSubject = "";
      }
      clearCity():void
      {
        this.currentCity = "";
      }
      clearName():void{
        this.name = "";
      }

  getSubjectName(id:number):string{
    return this.subjectService.getSubjectById(id);
  }
  //>>>>>copied session
  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  // // ngOnInit() {

  // // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(value)
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  //<<<<<<
}
