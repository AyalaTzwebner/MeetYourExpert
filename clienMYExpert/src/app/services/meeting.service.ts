import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from '../classes/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  url="http://localhost:3000/meetings/"
  constructor(private http:HttpClient) { 

  }
  addMeeting(meet:Meeting):Observable<any>{
    return this.http.post(this.url+"add-meeting",meet);
  }
}
