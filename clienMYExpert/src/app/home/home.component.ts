import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any
  constructor(private route: Router) { 
  this.user=null;
  }
  ngOnInit(): void {
    console.log("start from here")
    this.user = JSON.parse(localStorage.getItem("manager"));
    if (this.user === null) {
      console.log("manager not found")
      this.user = JSON.parse(localStorage.getItem('expert'));
      if (this.user === null)
      console.log("expert not found")
        this.user = JSON.parse(localStorage.getItem("user"));
    }
    
    console.log(this.user)
  }
  logOut() {
    localStorage.setItem("user", null);
    localStorage.setItem("manager", null);
    localStorage.setItem("expert", null);
    this.user=null;
    this.route.navigateByUrl("/about");

  }
}
