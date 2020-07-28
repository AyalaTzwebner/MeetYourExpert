import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from '../classes/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  url = "http://localhost:3000/meetings/";
  @Output() public getExistedMeeting: EventEmitter<Meeting> = new EventEmitter();
  constructor(private http: HttpClient) {

  }
  addMeeting(meet: Meeting): Observable<any> {
    return this.http.post(this.url + "add-meeting", meet);
  }
  updateMeeting(meet:Meeting):Observable<any>{
    return this.http.put(this.url+"put-meeting",meet);
  }
  findUserMeeting(userId: number, expId: number): Observable<Meeting> {
    return this.http.get<Meeting>(this.url + "find-user-meeting", { params: new HttpParams().set('user', userId.toString()).set('expert', expId.toString()) });
  }
  deleteMeeting(meeting: Meeting): Observable<any> {
    return this.http.delete<any>(this.url + "delete-meeting/" + meeting.id)
  }
}
