import { Injectable } from '@angular/core';
import { Expert } from '../classes/expert';
import { SubjectsService } from './subjects.service';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertsService {
  
  filterExperts(currentSubject: string, currentCity: string, name: string) : Observable<Expert[]>{
    return this.http.get<Expert[]>(this.url+"filter/");
  }
  allExperts:Expert[]=[]
  url = "http://localhost:3000/experts/";
  constructor(private subjects:SubjectsService,private users:UsersService,private http:HttpClient) {
   }
  signup(expert:Expert){
    return this.http.post(this.url + "signup", expert);
  }
  getAllExperts(): Observable<Expert[]>{
    return this.http.get<Expert[]>(this.url+"all");
  }
  getById(id:number){
    return this.http.get(this.url+id)
  }
}
