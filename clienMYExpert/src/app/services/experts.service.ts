import { Injectable } from '@angular/core';
import { Expert } from '../classes/expert';
import { SubjectsService } from './subjects.service';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpertsService {
  allExperts:Expert[]=[]
  expertsCnt=1000;
  url = "http://localhost:3000/experts/";
  constructor(private subjects:SubjectsService,private users:UsersService,private http:HttpClient) {
   }
  signup(expert:Expert){
    return this.http.post(this.url + "signup", expert);
  }
  getAllExperts(){
    return this.http.get(this.url+"all");
  }
  getById(id:number){
    console.log("4");
    return this.http.get("http://localhost:3000/experts/"+id)
  }
}
