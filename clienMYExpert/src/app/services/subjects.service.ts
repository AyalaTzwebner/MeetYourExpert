import { Injectable } from '@angular/core';
import { Subject } from '../classes/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  allSubject:Subject[]=[]
  subjectId:number=0;
  constructor() {
    this.allSubject.push(new Subject(this.subjectId++,"carpentry"))
    this.allSubject.push(new Subject(this.subjectId++,"electrical engineering"))
    this.allSubject.push(new Subject(this.subjectId++,"plumbing"))
    this.allSubject.push(new Subject(this.subjectId++,"technician"))
    this.allSubject.push(new Subject(this.subjectId++,"Computer Technician",this.getSubjectById(this.subjectId-1)))
    this.allSubject.push(new Subject(this.subjectId++,"Tar"))
    this.allSubject.push(new Subject(this.subjectId++,"painting"))
   }
   getSubjectById(id:number):Subject{
    let s:Subject;
    s=this.allSubject.find(subject=>subject.id==id);
    if(s!=null)
    return s;
    return new Subject();
  }
  getSubjectByName(name:string):Subject{
    this.allSubject.forEach(subject => {
      if(subject.subName==name)
      return subject;
    });
    return null;
  }
  getAllSubjects():Subject[]{
    return this.allSubject;
  }
}
