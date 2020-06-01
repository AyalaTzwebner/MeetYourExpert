import { Injectable } from '@angular/core';
import { Expert } from '../classes/expert';
import { SubjectsService } from './subjects.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ExpertsService {
  allExperts:Expert[]=[]
  expertsCnt=1000
  constructor(private subjects:SubjectsService,private users:UsersService) {
    this.allExperts.push(new Expert(users.getUserById(10000),subjects.getSubjectById(1)))
    this.allExperts.push(new Expert(users.getUserById(10002),subjects.getSubjectById(4)))
    this.allExperts.push(new Expert(users.getUserById(10003),subjects.getSubjectById(6)))
   }
   getAllExperts():Expert[]{
    return this.allExperts;
  }
}
