import { Injectable } from '@angular/core';
import { Recommend } from '../classes/recommend';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendsService {

  getPerPage(pageSize:number,pageIndex:number){
    return this.http.get(this.url+"all/page/"+pageIndex,{params:new HttpParams().set('npp',pageSize.toString()).set('page',pageIndex.toString())})  
  }

  url:string = "http://localhost:3000/recommend/";
  constructor(private http:HttpClient) { }
  saveRecommend(rec:any)
  { 
  return  this.http.post<Recommend>(this.url + "saveRecommend", rec);
  }
  getAllRecommends(): Observable<Recommend[]>{
    return this.http.get<Recommend[]>(this.url + "getRecommends");
  }

  changeStatus(r:Recommend):Observable<Recommend>{

    return this.http.put<Recommend>(this.url + 'changeStatus', r );
 }
 
 getAllApprovedRecommends(id: number):Observable<Recommend[]> {
    return this.http.get<Recommend[]>(this.url + "getApprovedRecommends/" + id);
  }
}
