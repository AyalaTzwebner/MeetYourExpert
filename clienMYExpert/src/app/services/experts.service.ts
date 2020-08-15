import { Injectable } from '@angular/core';
import { Expert } from '../classes/expert';
import { SubjectsService } from './subjects.service';
import { UsersService } from './users.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ExpertsService {
  allExperts: Expert[] = []
  url = "http://localhost:3000/experts/";
  constructor(private subjects: SubjectsService, private users: UsersService, private http: HttpClient) {
  }

  signup(expert: Expert) {
    return this.http.post(this.url + "signup", expert);
  }

  getAllExperts(): Observable<Expert[]> {
    return this.http.get<Expert[]>(this.url + "all");
  }

  getById(id: number) {
    return this.http.get(this.url + id)
  }
  getPerPage(pageSize:number,pageIndex:number){
    return this.http.get(this.url+"all/page/"+pageIndex,{params:new HttpParams().set('npp',pageSize.toString()).set('page',pageIndex.toString())})  
  }

  filterExperts(currentCategory: string, currentSubject: string, currentCity: string, name: string): Observable<Expert[]> {
    return this.http.get<Expert[]>(this.url + "filter", { params: new HttpParams().set('subject', currentSubject).set('city', currentCity).set('name', name).set('category', currentCategory) });
  }
  changeStatus(id,status){
    return this.http.put(this.url+"change-status",{id:id,status:status});
  }
  putExpert(exp:Expert){
    console.log("HHHHHHHHH")
    return this.http.put(this.url+"put-expert",exp)
  }
  insertImg(fd:FormData){
    return this.http.post(this.url+"change-image",fd);
  }
}
