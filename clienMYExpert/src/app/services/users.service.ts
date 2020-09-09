import { Injectable, EventEmitter, Output } from '@angular/core';
import { User } from '../classes/user';
import { CitiesService } from './cities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  @Output() public getLoggedInName: EventEmitter<User> = new EventEmitter();
  url = "http://localhost:3000/users/";
  allUsers: User[] = [];
  constantId: number = 10000;
  constructor(private http: HttpClient, private cities: CitiesService) {
  }
  getUserById(id: number): Observable<User> {
   return this.http.get<User>(this.url + id.toString());

  }
  getAllUsers(): User[] {
    return this.allUsers;
  }
  login(user: any):Observable<User> {
    
    return this.http.post<User>(this.url + "login", user);
  }
  loginManager(user: any):Observable<User> {
    return this.http.post<User>(this.url + "loginManager", user);
  }
  post(user: User):Observable<any> {
    console.log("ng post!");
    return this.http.post<any>(this.url + "signup", user);
  }
  getCurrentUser():User{
    let user:User=new User();
    let json:any=JSON.parse(localStorage.getItem("user"));
    user.id=json.id;
    user.userName=json.userName;
    user.email=json.email;
    user.id=json.id;
    user.city=json.city;
    user.userPassword=json.userPassword
    return user;
  }

}
