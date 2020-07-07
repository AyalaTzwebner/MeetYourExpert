import { Injectable } from '@angular/core';
import { Subject } from '../classes/subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
 
  allSubject: Subject[] = [];
  url = "http://localhost:3000/subjects/";
  constructor(private http: HttpClient) {
    console.log("subjects")
    this.http.get<Subject[]>(this.url + "all").subscribe(
      (res: Subject[]) => {
        this.allSubject = res
      },
      err =>
        console.log(err)
    )
  }
  getSubjectById(id: number): Subject {
    let s: Subject;
    s = this.allSubject.find(subject => subject.id == id);
    if (s != null)
      return s;
    return new Subject();
  }
  getSubjectByName(name: string): number {
    var subject = this.allSubject.filter(x => x.subName == name);
    if (!subject || subject.length == 0) {
      return null;
    }
    return subject[0].id;


  }
  getAllSubjects(parent: number) {

    return this.allSubject.filter(x=>x.parent == parent);
  }
  getChildrenSubjects() {

    return this.allSubject.filter(x=>x.parent != null);
  }
  getAllParentsSubjects(): Subject[] {
    return this.allSubject.filter(x=>x.parent == null);
  }
}
