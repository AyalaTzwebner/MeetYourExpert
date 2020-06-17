import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { CitiesService } from './cities.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "http://localhost:3000/users/";
  allUsers: User[] = [];
  constantId: number = 10000;
  constructor(private http: HttpClient, private cities: CitiesService) {
  }
  getUserById(id: number): User {
    let u: User;
    u = this.allUsers.find(user => user.id == id);
    if (u != null)
      return u;
    return new User();
  }
  getAllUsers(): User[] {
    return this.allUsers;
  }
  login(user: User) {

    return this.http.post(this.url + "login", user);
  }
  post(user: User) {
    console.log("ng post!")
    return this.http.post(this.url + "signup", user);
  }
}
