import { Injectable } from '@angular/core';
import { Recommend } from '../classes/recommend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendsService {


  url:string = "http://localhost:3000/recommend/";
  constructor(private http:HttpClient) { }
  saveRecommend(rec:any)
  { 
  alert('iam here');
  return  this.http.post<Recommend>(this.url + "saveRecommend", rec);
  }
  getAllRecommends(): Observable<Recommend[]>{
    return this.http.get<Recommend[]>(this.url + "getRecommends");
  }

  changeStatus(id:number, sta:boolean):Observable<Recommend>{

    return this.http.put<Recommend>(this.url + 'changeStatus', {commentId : id, status: sta} );
 }
 
 getAllApprovedRecommends(id: number):Observable<Recommend[]> {
    return this.http.get<Recommend[]>(this.url + "getApprovedRecommends/" + id);
  }
}
