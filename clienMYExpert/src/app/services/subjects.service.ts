import { Injectable } from '@angular/core';
import { Subject } from '../classes/subject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
 
  allSubject: Subject[] = [];
  parentSubjects: Subject[] = [];
  childrenSubjects: Subject[] = [];
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
    this.http.get<Subject[]>(this.url + "parents").subscribe(
      (res:Subject[]) => {
        this.parentSubjects = res;
      },
      err =>
      console.log(err)
    )

  }
  getSubjectById(id: number): string {
    let s: Subject;
    s = this.allSubject.find(subject => subject.id == id);
    if (s != null)
      return s.subName;
    return "";
  }
  getSubjectByName(name: string): number {
    var subject = this.allSubject.filter(x => x.subName == name);
    if (!subject || subject.length == 0) {
      return null;
    }
    return subject[0].id;


  }
  getAllSubjects() {
    return this.allSubject;
  }
  getChildrenSubjects(ID:string):Subject[] {

    // return this.allSubject.filter(x=>x.parent != null);
    if (ID=='-1')
      return null;
    this.http.get<Subject[]>(this.url + "children", { params: new HttpParams().set('id' , ID) }).subscribe(

      (res:Subject[]) => {
        this.childrenSubjects = res;
      },
      err =>
      console.log(err)
    )
      return this.childrenSubjects;
  }
  getAllParentsSubjects():Subject[] {
    return this.parentSubjects;
  }
}
